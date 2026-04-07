import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Heading from "@theme/Heading";
import MDXContent from "@theme/MDXContent";
import ReadingTime from "@site/src/components/ReadingTime/ReadingTime";

function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === "undefined";
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({ children }) {
  const { frontMatter } = useDoc();
  const syntheticTitle = useSyntheticTitle();
  const readingTimeMinutes = Number(frontMatter.reading_time_minutes);
  const readingTimeWords = Number(frontMatter.reading_time_words);
  const readingTimeNode = (
    <ReadingTime
      key="doc-reading-time"
      minutes={readingTimeMinutes}
      words={readingTimeWords}
    />
  );

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
          {readingTimeNode}
        </header>
      )}
      {!syntheticTitle && frontMatter.hide_title && (
        <ReadingTime minutes={readingTimeMinutes} words={readingTimeWords} />
      )}
      {!syntheticTitle && !frontMatter.hide_title && readingTimeNode}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
