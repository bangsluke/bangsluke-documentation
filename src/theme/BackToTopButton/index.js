import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import styles from './styles.module.css';

export default function BackToTopButtonWrapper() {
  const [shown, setShown] = useState(false);
  const rafId = useRef(null);

  const getScrollTop = useCallback(() => {
    // `document.scrollingElement` is more reliable than `documentElement` on iOS/Safari.
    const scrollingEl = document.scrollingElement || document.documentElement;
    const scrollTop =
      scrollingEl && typeof scrollingEl.scrollTop === 'number'
        ? scrollingEl.scrollTop
        : window.scrollY || 0;
    return scrollTop;
  }, []);

  const updateShown = useCallback(() => {
    const scrollingEl = document.scrollingElement || document.documentElement;
    const threshold = window.innerHeight * 0.1; // 10% of viewport height

    const scrollTop = getScrollTop();
    const scrollHeight =
      scrollingEl && typeof scrollingEl.scrollHeight === 'number'
        ? scrollingEl.scrollHeight
        : document.documentElement.scrollHeight;

    const atBottom = scrollTop + window.innerHeight >= scrollHeight - 1;
    setShown(scrollTop >= threshold && !atBottom);
  }, [getScrollTop]);

  useEffect(() => {
    const onScroll = () => {
      // Throttle updates with rAF to keep scroll smooth.
      if (rafId.current) return;
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null;
        updateShown();
      });
    };

    const onResize = () => updateShown();

    updateShown();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize);

    // When navigating to anchors, hide the button until the user scrolls again.
    const onHashChange = () => setShown(false);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('hashchange', onHashChange);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, [updateShown]);

  const scrollToTop = useCallback(() => {
    const scrollingEl = document.scrollingElement || document.documentElement;

    const trySmooth = () => {
      try {
        scrollingEl?.scrollTo?.({top: 0, behavior: 'smooth'});
      } catch {
        // ignore
      }
      try {
        window.scrollTo?.({top: 0, behavior: 'smooth'});
      } catch {
        // ignore
      }
    };

    const tryHard = () => {
      try {
        if (scrollingEl && typeof scrollingEl.scrollTop === 'number') {
          scrollingEl.scrollTop = 0;
        }
      } catch {
        // ignore
      }
      try {
        window.scrollTo(0, 0);
      } catch {
        // ignore
      }
    };

    // Attempt smooth scroll first for nicer UX.
    trySmooth();
    // Some mobile PWA/webviews ignore smooth scroll; enforce the final position.
    window.setTimeout(tryHard, 250);
  }, []);

  return (
    <button
      aria-label={translate({
        id: 'theme.BackToTopButton.buttonAriaLabel',
        message: 'Scroll back to top',
        description: 'The ARIA label for the back to top button',
      })}
      className={clsx(
        'clean-btn',
        ThemeClassNames.common.backToTopButton,
        styles.backToTopButton,
        shown && styles.backToTopButtonShow,
      )}
      type="button"
      onClick={scrollToTop}
    />
  );
}
