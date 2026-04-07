const DEFAULT_WORDS_PER_MINUTE = 220;

function countWords(text) {
  if (!text) return 0;
  const tokens = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return tokens.length;
}

function shouldCountNode(node) {
  if (!node || typeof node !== "object") return false;
  if (["yaml", "toml", "mdxjsEsm", "import", "export", "code"].includes(node.type)) {
    return false;
  }
  return true;
}

function walk(node, collector) {
  if (!node || typeof node !== "object") return;
  if (!shouldCountNode(node)) return;

  if (typeof node.value === "string") {
    collector.push(node.value);
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walk(child, collector);
    }
  }
}

module.exports = function remarkReadingTime(options = {}) {
  const wordsPerMinute = Number(options.wordsPerMinute) || DEFAULT_WORDS_PER_MINUTE;

  return function transformer(tree, file) {
    const textNodes = [];
    walk(tree, textNodes);

    const words = countWords(textNodes.join(" "));
    const minutes = words === 0 ? 0 : Number((words / wordsPerMinute).toFixed(2));

    file.data = file.data || {};
    file.data.frontMatter = file.data.frontMatter || {};

    file.data.frontMatter.reading_time_words = words;
    file.data.frontMatter.reading_time_minutes = minutes;
  };
};
