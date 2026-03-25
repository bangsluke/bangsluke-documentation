import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const docsDir = path.join(repoRoot, 'docs');
const outPath = path.join(repoRoot, 'src', 'theme', 'docsSidebarMeta.json');

function normalizeSlug(input) {
  if (typeof input !== 'string') return undefined;
  let slug = input.trim();
  if (!slug) return undefined;
  if (!slug.startsWith('/')) slug = '/' + slug;
  if (slug.length > 1 && slug.endsWith('/')) slug = slug.slice(0, -1);
  return slug;
}

function readDirRecursive(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...readDirRecursive(fullPath));
    else out.push(fullPath);
  }
  return out;
}

function parseFrontmatterAndBody(fileText) {
  // Matches CRLF/LF reliably.
  const fmMatch = fileText.match(/^---[\t ]*\r?\n([\s\S]*?)\r?\n---[\t ]*\r?\n?/);
  if (!fmMatch) return {frontmatter: null, body: fileText};
  return {frontmatter: fmMatch[1], body: fileText.slice(fmMatch[0].length)};
}

function readSlugFromFrontmatter(frontmatter) {
  if (!frontmatter) return undefined;
  const m = frontmatter.match(/^[ \t]*slug:[ \t]*(.+)[ \t]*$/m);
  if (!m) return undefined;
  return normalizeSlug(m[1].trim().replace(/^['"]|['"]$/g, ''));
}

function readSidebarPositionFromFrontmatter(frontmatter) {
  if (!frontmatter) return undefined;
  const m = frontmatter.match(/^[ \t]*sidebar_position:[ \t]*(\d+)[ \t]*$/m);
  if (!m) return undefined;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : undefined;
}

function readFirstH1Title(body) {
  // First line beginning with "# " is treated as the page H1.
  const m = body.match(/^[ \t]*#[ \t]+(.+?)[ \t]*$/m);
  if (!m) return undefined;
  return m[1].trim();
}

function readLeadingNumberFromFilename(filename) {
  const base = path.basename(filename, path.extname(filename));
  const m = base.match(/^(\d+)[-_ ]?/);
  if (!m) return undefined;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : undefined;
}

const allFiles = readDirRecursive(docsDir);
const categoryFiles = allFiles.filter((f) => f.endsWith('_category_.json'));
const mdFiles = allFiles.filter((f) => f.toLowerCase().endsWith('.md') || f.toLowerCase().endsWith('.mdx'));

const categoriesBySlug = {};
const categoryIndexSlugs = new Set();
const categorySlugByFolderPath = new Map();
const categoryFolderPathBySlug = {};

for (const categoryFile of categoryFiles) {
  try {
    const raw = fs.readFileSync(categoryFile, 'utf8');
    const json = JSON.parse(raw);
    const linkSlug = normalizeSlug(json?.link?.slug);
    if (!linkSlug) continue;

    categoriesBySlug[linkSlug] = {
      label: json?.label ?? undefined,
      collapsed: Boolean(json?.collapsed),
      position: typeof json?.position === 'number' ? json.position : undefined,
    };
    categoryIndexSlugs.add(linkSlug);
    const folderPath = path.dirname(categoryFile);
    categorySlugByFolderPath.set(folderPath.toLowerCase(), linkSlug);
    categoryFolderPathBySlug[linkSlug] = folderPath;
  } catch {
    // ignore malformed category files
  }
}

const docH1BySlugOrPath = {};
const docLeafSortBySlugOrPath = {};
const docsForTree = [];
const docsDirNorm = docsDir.toLowerCase();

function getDeepestCategorySlugForFile(filePath) {
  let dir = path.dirname(filePath);
  while (dir && dir.toLowerCase().startsWith(docsDirNorm)) {
    const hit = categorySlugByFolderPath.get(dir.toLowerCase());
    if (hit) return hit;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return undefined;
}

for (const mdFile of mdFiles) {
  const fileText = fs.readFileSync(mdFile, 'utf8');
  const {frontmatter, body} = parseFrontmatterAndBody(fileText);
  const slug = readSlugFromFrontmatter(frontmatter);
  if (!slug) continue;

  const h1 = readFirstH1Title(body);
  if (h1) {
    docH1BySlugOrPath[slug] = h1;
    docH1BySlugOrPath['/docs' + slug] = h1;
    docH1BySlugOrPath[slug.replace(/^\//, '')] = h1;
  }

  // Leaf ordering:
  // - prefer frontmatter sidebar_position
  // - else parse leading number from filename
  const fmPos = readSidebarPositionFromFrontmatter(frontmatter);
  const leadingFromFilename = readLeadingNumberFromFilename(mdFile);
  const sortValue = fmPos ?? leadingFromFilename;
  if (typeof sortValue === 'number' && Number.isFinite(sortValue)) {
    docLeafSortBySlugOrPath[slug] = sortValue;
    docLeafSortBySlugOrPath['/docs' + slug] = sortValue;
    docLeafSortBySlugOrPath[slug.replace(/^\//, '')] = sortValue;
  }

  if (h1) {
    docsForTree.push({
      slug,
      h1,
      sort: typeof sortValue === 'number' && Number.isFinite(sortValue) ? sortValue : undefined,
      assignedCategorySlug: getDeepestCategorySlugForFile(mdFile),
    });
  }
}

const toCategoryLabel = (segment) => {
  const smallWords = new Set(['to', 'and', 'or', 'the', 'of', 'in', 'for', 'with', 'on']);
  const raw = String(segment)
    .replace(/[-_]/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Za-z])(\d)/g, '$1 $2')
    .replace(/(\d)([A-Za-z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

  return raw
    .split(' ')
    .filter(Boolean)
    .map((w) => {
      const lw = w.toLowerCase();
      if (smallWords.has(lw)) return lw;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
};

function buildSidebarItemsTree() {
  const categoryIndexSlugSet = new Set(categoryIndexSlugs);

  const nodesBySlug = new Map();
  for (const [categorySlug, meta] of Object.entries(categoriesBySlug)) {
    nodesBySlug.set(categorySlug, {
      type: 'category',
      label: meta?.label ?? toCategoryLabel(categorySlug.split('/').filter(Boolean).pop()),
      href: `/docs${categorySlug}`,
      collapsible: true,
      collapsed: Boolean(meta?.collapsed),
      position: typeof meta?.position === 'number' ? meta.position : undefined,
      items: [],
      categories: new Map(),
      links: [],
    });
  }

  const getParentCategorySlug = (categorySlug) => {
    const folderPath = categoryFolderPathBySlug?.[categorySlug];
    if (!folderPath) return undefined;

    let dir = path.dirname(folderPath);
    const docsNorm = docsDirNorm;

    while (dir && dir.toLowerCase().startsWith(docsNorm)) {
      const candidate = categorySlugByFolderPath.get(dir.toLowerCase());
      if (candidate) return candidate;
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
    return undefined;
  };

  const rootCategorySlugs = [];
  for (const categorySlug of nodesBySlug.keys()) {
    const parentSlug = getParentCategorySlug(categorySlug);
    if (parentSlug && nodesBySlug.has(parentSlug)) {
      nodesBySlug.get(parentSlug).categories.set(categorySlug, nodesBySlug.get(categorySlug));
    } else {
      rootCategorySlugs.push(categorySlug);
    }
  }

  const rootLinks = [];
  for (const doc of docsForTree) {
    const normalizedDocSlug = normalizeSlug(doc.slug);
    if (!normalizedDocSlug) continue;

    // Don't render category index docs as leaf links; they should be
    // represented as their own category node.
    if (categoryIndexSlugSet.has(normalizedDocSlug)) continue;

    const assignedSlug = doc.assignedCategorySlug;
    const href = `/docs${normalizedDocSlug}`;
    const linkItem = {
      type: 'link',
      label: doc.h1,
      href,
      sort: typeof doc.sort === 'number' ? doc.sort : undefined,
    };

    if (assignedSlug && nodesBySlug.has(assignedSlug)) {
      nodesBySlug.get(assignedSlug).links.push(linkItem);
    } else {
      rootLinks.push(linkItem);
    }
  }

  const materialize = (node) => {
    const categoryChildren = Array.from(node.categories.values())
      .map(materialize)
      .sort((a, b) => {
        const apos =
          typeof a.position === 'number' ? a.position : Number.POSITIVE_INFINITY;
        const bpos =
          typeof b.position === 'number' ? b.position : Number.POSITIVE_INFINITY;
        if (apos !== bpos) return apos - bpos;
        return String(a.label).localeCompare(String(b.label));
      });

    const linkChildren = node.links
      .slice()
      .sort((a, b) => {
        const asort = typeof a.sort === 'number' ? a.sort : Number.POSITIVE_INFINITY;
        const bsort = typeof b.sort === 'number' ? b.sort : Number.POSITIVE_INFINITY;
        if (asort !== bsort) return asort - bsort;
        return String(a.label).localeCompare(String(b.label));
      });

    node.items = [...categoryChildren, ...linkChildren];
    delete node.categories;
    delete node.links;
    return node;
  };

  const rootCategories = rootCategorySlugs.map((slug) => nodesBySlug.get(slug));
  const rootCategoryItems = rootCategories.map(materialize);

  const allRootItems = [
    ...rootCategoryItems,
    ...rootLinks,
  ];

  allRootItems.sort((a, b) => {
    const aOrder =
      a.type === 'category' ? (typeof a.position === 'number' ? a.position : Number.POSITIVE_INFINITY) : (typeof a.sort === 'number' ? a.sort : Number.POSITIVE_INFINITY);
    const bOrder =
      b.type === 'category' ? (typeof b.position === 'number' ? b.position : Number.POSITIVE_INFINITY) : (typeof b.sort === 'number' ? b.sort : Number.POSITIVE_INFINITY);
    if (aOrder !== bOrder) return aOrder - bOrder;
    return String(a.label).localeCompare(String(b.label));
  });

  return allRootItems;
}

const sidebarItems = buildSidebarItemsTree();

const meta = {
  generatedAt: new Date().toISOString(),
  categoriesBySlug,
  categoryIndexSlugs: Array.from(categoryIndexSlugs),
  docH1BySlugOrPath,
  docLeafSortBySlugOrPath,
  sidebarItems,
};

fs.mkdirSync(path.dirname(outPath), {recursive: true});
fs.writeFileSync(outPath, JSON.stringify(meta, null, 2), 'utf8');

console.log(
  '[generate-docs-sidebar-meta]',
  `categories=${Object.keys(categoriesBySlug).length}`,
  `docsWithH1=${Object.keys(docH1BySlugOrPath).length}`,
  `out=${path.relative(repoRoot, outPath)}`,
);

