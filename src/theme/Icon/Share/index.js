import React from 'react';

// Keep in sync with other repo usage of Docusaurus static SVGs.
// `@static/*` isn't available in this project, but `@site/static/*` is.
const ShareSvg = require('@site/static/img/share.svg').default;

export default function IconShare({
  width = 18,
  height = 18,
  className,
  style,
  ...props
}) {
  return (
    <ShareSvg
      width={width}
      height={height}
      className={className}
      // Ensure the SVG matches surrounding `color` (set by the share button).
      style={{fill: 'currentColor', ...style}}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

