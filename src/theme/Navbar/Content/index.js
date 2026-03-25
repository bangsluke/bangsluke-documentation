import React, {useCallback, useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  ErrorCauseBoundary,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import IconShare from '@theme/Icon/Share';
import styles from './styles.module.css';

function useToastMessage() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!message) return undefined;
    const t = window.setTimeout(() => setMessage(null), 2200);
    return () => window.clearTimeout(t);
  }, [message]);

  return {message, show: setMessage};
}

function ShareIconButton({behindMenu}) {
  const {message, show} = useToastMessage();

  const copyUrl = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        throw new Error('clipboard api unavailable');
      }
    } catch (e) {
      // Fallback for environments where `navigator.clipboard` is restricted.
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch {
        // ignore
      }
      document.body.removeChild(textarea);
    }

    show('Copied to clipboard to share');
  }, [show]);

  return (
    <>
      <button
        type="button"
        aria-label="Share link"
        title="Share link"
        onClick={copyUrl}
        // Keep layout in CSS so it doesn't get overlapped by the mobile search button.
        className={clsx('clean-btn', styles.shareButton)}
        style={{
          zIndex: behindMenu ? 0 : 1,
          pointerEvents: behindMenu ? 'none' : 'auto',
        }}>
        <IconShare width={18} height={18} className={styles.shareIcon} />
      </button>

      {message && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: '4.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20000,
            background: 'var(--ifm-color-emphasis-1000, #000)',
            color: 'var(--ifm-color-emphasis-200, #fff)',
            padding: '0.45rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.875rem',
            boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>
          {message}
        </div>
      )}
    </>
  );
}

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

function NavbarItems({items}) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({left, right}) {
  return (
    <div className="navbar__inner">
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerLeft,
          'navbar__items',
        )}>
        {left}
      </div>
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerRight,
          'navbar__items navbar__items--right',
        )}>
        {right}
      </div>
    </div>
  );
}

export default function NavbarContentWrapper() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = useMemo(
    () => items.find((item) => item.type === 'search'),
    [items],
  );

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <div className={styles.searchCluster}>
                <ShareIconButton behindMenu={mobileSidebar.shown} />
                <SearchBar />
              </div>
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
