import React, {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import Translate from '@docusaurus/Translate';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
  useThemeConfig,
} from '@docusaurus/theme-common';
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import {useAllDocsData, useDocsData} from '@docusaurus/plugin-content-docs/client';
import docsSidebarMeta from '../../../docsSidebarMeta.json';

function SecondaryMenuBackButton(props) {
  return (
    <button
      {...props}
      type="button"
      className="clean-btn navbar-sidebar__back">
      <Translate
        id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
        description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)">
        ← Back to main menu
      </Translate>
    </button>
  );
}

// Renders the docs sidebar tree inside the mobile navbar secondary panel.
const DocsSidebarSecondaryMenu = ({sidebar, path}) => {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        level={1}
        onItemClick={(item) => {
          // Mobile sidebar should only be closed if the category has a link.
          if (item.type === 'category' && item.href) {
            mobileSidebar.toggle();
          }
          if (item.type === 'link') {
            mobileSidebar.toggle();
          }
        }}
      />
    </ul>
  );
};

export default function NavbarMobileSidebarSecondaryMenu() {
  const location = useLocation();
  const mobileSidebar = useNavbarMobileSidebar();
  // Use global docs data so this works even on non-doc routes like `/`.
  const allDocsData = useAllDocsData();
  const docsDataForPlugin = useDocsData('default');

  const resolved = useMemo(() => {
    const allKeys = allDocsData ? Object.keys(allDocsData) : null;
    const docsData =
      docsDataForPlugin ??
      allDocsData?.default ??
      (allDocsData && allKeys ? allDocsData[allKeys[0]] : undefined) ??
      allDocsData;

    const versionsRaw = docsData?.versions;
    const versionsArr = Array.isArray(versionsRaw)
      ? versionsRaw
      : versionsRaw && typeof versionsRaw === 'object'
        ? Object.values(versionsRaw)
        : [];

    const latestVersion =
      versionsArr.find((v) => v && v.isLast) ?? versionsArr[0];

    const directDocsSidebars = latestVersion?.docsSidebars;
    const latestDocs = Array.isArray(latestVersion?.docs)
      ? latestVersion.docs
      : [];

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

    const getDocHref = (doc) => {
      if (typeof doc?.path === 'string') return doc.path;
      if (typeof doc?.href === 'string') return doc.href;
      if (typeof doc?.url === 'string') return doc.url;
      if (typeof doc?.slug === 'string') return `/docs/${doc.slug}`;
      if (typeof doc?.id === 'string') return `/docs/${doc.id}`;
      return undefined;
    };

    const getDocTitle = (doc, fallbackLabel) => {
      const h1FromMapping =
        (typeof doc?.path === 'string' &&
          docsSidebarMeta.docH1BySlugOrPath?.[doc.path]) ||
        (typeof doc?.slug === 'string' &&
          docsSidebarMeta.docH1BySlugOrPath?.[doc.slug]) ||
        (typeof doc?.id === 'string' &&
          docsSidebarMeta.docH1BySlugOrPath?.[doc.id]);

      return (
        h1FromMapping ??
        doc?.title ??
        doc?.unlistedTitle ??
        doc?.name ??
        fallbackLabel
      );
    };

    // Build a sidebar-like tree from doc IDs (works on `/` even without `docsSidebars` metadata).
    // This isn't 100% identical to Docusaurus' generated sidebar ordering, but it avoids the blank menu.
    const builtSidebarItems = (() => {
      /**
       * Node shape used while building:
       * - type: always "category"
       * - items: category's children (categories + links) materialized at the end
       * - categories: map of child category segment -> node
       * - links: array of link items
       */
      const root = new Map();

      const normalizeSlug = (input) => {
        if (typeof input !== 'string') return undefined;
        let slug = input.trim();
        if (!slug) return undefined;
        if (!slug.startsWith('/')) slug = '/' + slug;
        if (slug.length > 1 && slug.endsWith('/')) slug = slug.slice(0, -1);
        return slug;
      };

      const {
        categoriesBySlug = {},
        categoryIndexSlugs = [],
        docLeafSortBySlugOrPath = {},
      } = docsSidebarMeta ?? {};
      const categoryIndexSlugSet = new Set(categoryIndexSlugs);

      const ensureCategoryNode = (segment, categorySlug) => {
        const existing = root.get(segment);
        if (existing) return existing;
        const normalizedCategorySlug = normalizeSlug(categorySlug);
        const categoryMeta = normalizedCategorySlug
          ? categoriesBySlug[normalizedCategorySlug]
          : undefined;
        const collapsed = categoryMeta?.collapsed ?? false;
        const position = categoryMeta?.position;
        const node = {
          type: 'category',
          label: categoryMeta?.label ?? toCategoryLabel(segment),
          href: normalizedCategorySlug
            ? `/docs${normalizedCategorySlug}`
            : undefined,
          collapsible: true,
          collapsed,
          position,
          items: [],
          categories: new Map(),
          links: [],
        };
        root.set(segment, node);
        return node;
      };

      const ensureChildCategoryNode = (parentNode, segment, categorySlug) => {
        const existing = parentNode.categories.get(segment);
        if (existing) return existing;
        const normalizedCategorySlug = normalizeSlug(categorySlug);
        const categoryMeta = normalizedCategorySlug
          ? categoriesBySlug[normalizedCategorySlug]
          : undefined;
        const collapsed = categoryMeta?.collapsed ?? false;
        const position = categoryMeta?.position;
        const node = {
          type: 'category',
          label: categoryMeta?.label ?? toCategoryLabel(segment),
          href: normalizedCategorySlug
            ? `/docs${normalizedCategorySlug}`
            : undefined,
          collapsible: true,
          collapsed,
          position,
          items: [],
          categories: new Map(),
          links: [],
        };
        parentNode.categories.set(segment, node);
        return node;
      };

      for (const doc of latestDocs) {
        // Use `doc.slug` for hierarchy prefixes because it's aligned with the `_category_.json` `link.slug`.
        const docSlug =
          typeof doc?.slug === 'string'
            ? doc.slug
            : typeof doc?.id === 'string'
              ? doc.id
              : undefined;
        if (!docSlug) continue;

        const href = getDocHref(doc);
        if (!href) continue;

        const segments = String(docSlug).split('/').filter(Boolean);
        if (segments.length === 0) continue;

        // Always create a top-level category from the first segment.
        const top = segments[0];
        const topSlug = '/' + segments.slice(0, 1).join('/');
        const topNode = ensureCategoryNode(top, topSlug);
        if (!topNode.href) topNode.href = href;

        // If this is a top-level document (e.g. `/documentation-intro`),
        // ensure it participates in ordering like a leaf doc.
        if (segments.length === 1) {
          const normalizedDocSlug = normalizeSlug(docSlug);
          const sortValue =
            (normalizedDocSlug
              ? docLeafSortBySlugOrPath[normalizedDocSlug]
              : undefined) ??
            (typeof doc?.path === 'string' ? docLeafSortBySlugOrPath[doc.path] : undefined) ??
            (typeof doc?.slug === 'string' ? docLeafSortBySlugOrPath[doc.slug] : undefined) ??
            (typeof doc?.id === 'string' ? docLeafSortBySlugOrPath[doc.id] : undefined);

          if (typeof sortValue === 'number' && typeof topNode.position !== 'number') {
            topNode.position = sortValue;
          }
          topNode.label = getDocTitle(doc, topNode.label);
        }

        let currentNode = topNode;
        // Intermediate segments become categories; last segment becomes a link.
        for (let i = 1; i < segments.length; i += 1) {
          const seg = segments[i];
          const isLeaf = i === segments.length - 1;

          if (isLeaf) {
            const normalizedDocSlug = normalizeSlug(docSlug);
            // Category index pages (generated by `_category_.json`) should not
            // be rendered as leaf links inside their own categories.
            if (normalizedDocSlug && categoryIndexSlugSet.has(normalizedDocSlug)) {
              // eslint-disable-next-line no-continue
              continue;
            }

            const linkLabel = getDocTitle(doc, toCategoryLabel(seg));
            const sortValue =
              (normalizedDocSlug
                ? docLeafSortBySlugOrPath[normalizedDocSlug]
                : undefined) ??
              (typeof doc?.path === 'string' ? docLeafSortBySlugOrPath[doc.path] : undefined) ??
              (typeof doc?.id === 'string' ? docLeafSortBySlugOrPath[doc.id] : undefined);

            currentNode.links.push({
              type: 'link',
              label: linkLabel,
              href,
              sort: sortValue,
            });
          } else {
            const categorySlug = '/' + segments.slice(0, i + 1).join('/');
            currentNode = ensureChildCategoryNode(
              currentNode,
              seg,
              categorySlug,
            );
            if (!currentNode.href) currentNode.href = href;
          }
        }
      }

      const materialize = (node) => {
        const categoryChildren = Array.from(node.categories.values())
          .map(materialize)
          .sort((a, b) => {
            const apos = typeof a.position === 'number' ? a.position : Number.POSITIVE_INFINITY;
            const bpos = typeof b.position === 'number' ? b.position : Number.POSITIVE_INFINITY;
            if (apos !== bpos) return apos - bpos;
            return String(a.label).localeCompare(String(b.label));
          });
        const linkChildren = node.links
          .map((link) => link)
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

      return Array.from(root.values())
        .map(materialize)
        .sort((a, b) => {
          const apos = typeof a.position === 'number' ? a.position : Number.POSITIVE_INFINITY;
          const bpos = typeof b.position === 'number' ? b.position : Number.POSITIVE_INFINITY;
          if (apos !== bpos) return apos - bpos;
          return String(a.label).localeCompare(String(b.label));
        });
    })();

    const docsSidebars =
      directDocsSidebars ??
      latestVersion?.sidebars ??
      docsData?.docsSidebars ??
      docsData?.sidebars ??
      undefined;

    const tutorialSidebar = docsSidebars?.tutorialSidebar;
    const tutorialSidebarItems = tutorialSidebar?.items;
    const tutorialSidebarItems2 = tutorialSidebarItems?.items;

    const resolvedTutorialSidebar = Array.isArray(tutorialSidebar)
      ? tutorialSidebar
      : tutorialSidebar && typeof tutorialSidebar === 'object'
        ? Array.isArray(tutorialSidebarItems)
          ? tutorialSidebarItems
          : Array.isArray(tutorialSidebarItems2)
            ? tutorialSidebarItems2
            : undefined
        : undefined;

    // Prefer the docs sidebar id we want; fall back to the first sidebar object if the shape differs.
    const sidebar =
      resolvedTutorialSidebar ??
      tutorialSidebar?.items ??
      (docsSidebars && typeof docsSidebars === 'object'
        ? Object.values(docsSidebars).find((v) => Array.isArray(v))
        : undefined);

    const tutorialSidebarLinkRaw = tutorialSidebar?.link ?? null;
    const tutorialSidebarLinkUrl =
      typeof tutorialSidebarLinkRaw === 'string'
        ? tutorialSidebarLinkRaw
        : tutorialSidebarLinkRaw && typeof tutorialSidebarLinkRaw === 'object'
          ? tutorialSidebarLinkRaw.href ??
            tutorialSidebarLinkRaw.url ??
            tutorialSidebarLinkRaw.path ??
            tutorialSidebarLinkRaw.src ??
            null
          : null;

    const sidebarItemsFinal = docsSidebarMeta.sidebarItems ?? builtSidebarItems;
    return {
      sidebarItems: sidebarItemsFinal,
      tutorialSidebarLinkRaw,
      tutorialSidebarLinkUrl,
    };
  }, [allDocsData, docsDataForPlugin, location.pathname]);

  const [sidebarItems, setSidebarItems] = useState(resolved.sidebarItems);
  const lastFetchedLinkRef = useRef(null);

  useEffect(() => {
    let didCancel = false;

    async function maybeFetchSidebar() {
      // If we already have an array, use it.
      if (Array.isArray(resolved.sidebarItems) && resolved.sidebarItems.length > 0) {
        setSidebarItems(resolved.sidebarItems);
        return;
      }

      const link = resolved.tutorialSidebarLinkUrl;
      if (!link) {
        setSidebarItems([]);
        return;
      }

      // Avoid refetch loops on rerender.
      if (lastFetchedLinkRef.current === link) {
        return;
      }
      lastFetchedLinkRef.current = link;

      try {
        const absUrl =
          typeof link === 'string' && link.startsWith('http')
            ? link
            : new URL(link, window.location.origin).toString();

        const res = await fetch(absUrl);
        const json = await res.json();

        // sidebar JSON is typically an array; support common wrappers.
        const nextItems =
          Array.isArray(json)
            ? json
            : Array.isArray(json?.items)
              ? json.items
              : Array.isArray(json?.sidebar)
                ? json.sidebar
                : [];

        if (!didCancel) {
          setSidebarItems(nextItems);
        }
      } catch (e) {
        if (!didCancel) setSidebarItems([]);
      }
    }

    maybeFetchSidebar();

    return () => {
      didCancel = true;
    };
  }, [resolved.sidebarItems, resolved.tutorialSidebarLinkUrl]);

  const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0;
  const secondaryMenu = useNavbarSecondaryMenu();

  return (
    <>
      {/* Keep the filler mounted so content is ready when the hamburger opens. */}
      <NavbarSecondaryMenuFiller
        component={DocsSidebarSecondaryMenu}
        props={{sidebar: sidebarItems, path: location.pathname}}
      />

      {/* edge-case: prevent returning to the primaryMenu when it's empty */}
      {!isPrimaryMenuEmpty && (
        <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
      )}

      {secondaryMenu.content}
    </>
  );
}

