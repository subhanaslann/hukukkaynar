'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const PRELOAD_ELEMENT_ID = 'pre-load';
const ACTIVE_CLASS = 'preload-active';
const DONE_CLASS = 'preload-done';

function getPreloadElement(): HTMLElement | null {
  return document.getElementById(PRELOAD_ELEMENT_ID);
}

function showPreloader() {
  const doc = document.documentElement;
  doc.classList.remove(DONE_CLASS);
  doc.classList.add(ACTIVE_CLASS);
  doc.setAttribute('data-loading', 'true');
  const el = getPreloadElement();
  if (el) {
    el.removeAttribute('aria-hidden');
  }
}

function hidePreloader() {
  const doc = document.documentElement;
  doc.classList.add(DONE_CLASS);
  doc.classList.remove(ACTIVE_CLASS);
  doc.removeAttribute('data-loading');
  const el = getPreloadElement();
  if (el) {
    el.setAttribute('aria-hidden', 'true');
  }
}

const SAFETY_DURATION = 1800;

function getInitialDuration() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 200 : 600;
}

function getRouteDuration() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 200 : 600;
}

export default function PreloadController() {
  const pathname = usePathname() ?? '';
  const searchParams = useSearchParams();
  const lastKey = useRef<string>('');
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const scheduleHide = useCallback((delay: number) => {
    const id = window.setTimeout(() => {
      hidePreloader();
      timersRef.current = timersRef.current.filter((timer) => timer !== id);
    }, delay);
    timersRef.current.push(id);
  }, []);

  const startPreload = useCallback(
    (minDuration: number, safetyDuration = SAFETY_DURATION) => {
      clearTimers();
      showPreloader();
      scheduleHide(minDuration);
      scheduleHide(safetyDuration);
    },
    [clearTimers, scheduleHide]
  );

  useEffect(() => {
    const onCustomShow = () => startPreload(700, SAFETY_DURATION);
    window.addEventListener('preload:show', onCustomShow);

    const handleLoad = () => {
      clearTimers();
      hidePreloader();
    };

    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      startPreload(getInitialDuration());
      window.addEventListener('load', handleLoad, { once: true });
    }

    const onPageShow = () => {
      clearTimers();
      hidePreloader();
    };
    window.addEventListener('pageshow', onPageShow);

    return () => {
      window.removeEventListener('preload:show', onCustomShow);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('pageshow', onPageShow);
      clearTimers();
    };
  }, [startPreload, clearTimers]);

  useEffect(() => {
    const key = `${pathname}?${searchParams?.toString() ?? ''}`;
    if (lastKey.current === key) return;
    lastKey.current = key;

    startPreload(getRouteDuration());
  }, [pathname, searchParams, startPreload]);

  return null;
}
