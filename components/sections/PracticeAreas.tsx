'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Section, SectionHeader } from '@/components/shared/Section';
import { Icons } from '@/components/shared/Icons';
import { PRACTICE_AREA_DEFINITIONS } from '@/lib/areas';
import { useAnimEnabled } from '@/components/AnimationProvider';
import { cn } from '@/lib/utils';
import styles from './PracticeAreas.module.css';

const isBrowser = typeof window !== 'undefined';
if (isBrowser) {
  gsap.registerPlugin(Draggable);
}

export function PracticeAreas() {
  const t = useTranslations('practiceAreas');
  const tItems = useTranslations('practiceAreas.items');
  const tCommon = useTranslations('common');
  const tSlider = useTranslations('practiceAreas.slider');
  const animEnabled = useAnimEnabled('lite');

  const cardsRef = useRef<HTMLUListElement | null>(null);
  const dragProxyRef = useRef<HTMLDivElement | null>(null);
  const nudgeRef = useRef<((dir: 1 | -1) => void) | null>(null);

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;

    if (!animEnabled) {
      setShouldAnimate(false);
      return;
    }

    const mq = window.matchMedia('(min-width: 768px)');
    const syncMatch = () => setShouldAnimate(mq.matches);

    syncMatch();
    mq.addEventListener('change', syncMatch);

    return () => {
      mq.removeEventListener('change', syncMatch);
    };
  }, [animEnabled]);

  useEffect(() => {
    nudgeRef.current = null;

    const listEl = cardsRef.current;

    if (!shouldAnimate || !animEnabled || !listEl) {
      if (listEl) {
        listEl.querySelectorAll<HTMLElement>('li').forEach((card) => {
          card.classList.remove(styles.cardActive, styles.cardInactive);
          card.style.pointerEvents = '';
          card.style.zIndex = '';
          card.style.removeProperty('transform');
          card.style.removeProperty('opacity');
        });
      }
      return;
    }

    const dragProxy = dragProxyRef.current;
    if (!dragProxy) {
      return;
    }

    const cards = Array.from(listEl.querySelectorAll<HTMLElement>('li'));
    if (!cards.length) {
      return;
    }

    const state = { index: 0 };
    const totalCards = cards.length;
    const SHIFT = 210;
    const VISIBLE_RADIUS = 1.2;
    const SCALE_MIN = 0.92;
    const OP_MIN = 0.38;
    const PX_PER_CARD = 240;
    const SNAP_THRESHOLD_PX = 80;

    const wrap = (value: number, n: number) => ((value % n) + n) % n;
    const shortest = (from: number, to: number, n: number) => {
      let diff = ((to - from + n / 2) % n) - n / 2;
      if (diff < -n / 2) {
        diff += n;
      }
      return diff;
    };

    const setX = cards.map((el) => gsap.quickSetter(el, 'x', 'px'));
    const setOpacity = cards.map((el) => gsap.quickSetter(el, 'opacity'));
    const setScale = cards.map((el) => (value: number) => gsap.set(el, { scale: value }));

    gsap.set(cards, {
      x: 0,
      scale: SCALE_MIN,
      opacity: OP_MIN,
      willChange: 'transform,opacity'
    });

    const updatePositions = () => {
      const center = state.index;
      const activeIndex = Math.round(wrap(center, totalCards));

      cards.forEach((el, i) => {
        const offset = shortest(center, i, totalCards);
        const distance = Math.abs(offset);

        if (distance > 2) {
          setX[i](Math.sign(offset || 1) * SHIFT * 2.5);
          setScale[i](SCALE_MIN);
          setOpacity[i](0);
          el.classList.remove(styles.cardActive);
          el.classList.add(styles.cardInactive);
          el.style.pointerEvents = 'none';
          el.style.zIndex = '0';
          return;
        }

        const t = Math.max(0, 1 - distance / VISIBLE_RADIUS);
        const x = offset * SHIFT;
        const scale = SCALE_MIN + (1 - SCALE_MIN) * t;
        const opacity = OP_MIN + (1 - OP_MIN) * t;

        setX[i](x);
        setScale[i](scale);
        setOpacity[i](opacity);

        const z = Math.round(t * 10) + (distance < 0.4 ? 20 : 0);
        el.style.zIndex = String(z);

        const isActive = i === activeIndex;
        el.classList.toggle(styles.cardActive, isActive);
        el.classList.toggle(styles.cardInactive, !isActive);
        el.style.pointerEvents = isActive ? 'auto' : 'none';
      });
    };

    updatePositions();

    const nudge = (dir: 1 | -1) => {
      if (gsap.isTweening(state)) return;
      gsap.killTweensOf(state);
      gsap.to(state, {
        index: state.index + dir,
        duration: 0.35,
        ease: 'power2.out',
        onUpdate: updatePositions
      });
    };

    nudgeRef.current = nudge;

    const body = typeof document !== 'undefined' ? document.body : null;
    let startIndex = state.index;
    let startX = 0;

    const draggable = Draggable.create(dragProxy, {
      type: 'x',
      trigger: cardsRef.current,
      zIndexBoost: false,
      allowContextMenu: true,
      onPress(this: Draggable) {
        gsap.killTweensOf(state);
        startIndex = state.index;
        startX = this.startX;
        if (body) {
          body.style.userSelect = 'none';
        }
      },
      onDrag(this: Draggable) {
        const deltaPx = startX - this.x;
        state.index = startIndex + deltaPx / PX_PER_CARD;
        updatePositions();
      },
      onRelease(this: Draggable) {
        if (body) {
          body.style.userSelect = '';
        }
        const deltaPx = startX - this.x;
        const step = Math.abs(deltaPx) < SNAP_THRESHOLD_PX ? 0 : deltaPx > 0 ? 1 : -1;
        const target = startIndex + step;
        gsap.killTweensOf(state);
        gsap.to(state, {
          index: target,
          duration: 0.4,
          ease: 'power2.out',
          onUpdate: updatePositions
        });
      }
    })[0];

    return () => {
      nudgeRef.current = null;
      gsap.killTweensOf(state);
      draggable?.kill();
      if (body) {
        body.style.userSelect = '';
      }
      cards.forEach((el) => {
        el.classList.remove(styles.cardActive, styles.cardInactive);
        el.style.pointerEvents = '';
        el.style.zIndex = '';
        el.style.removeProperty('transform');
        el.style.removeProperty('opacity');
      });
    };
  }, [shouldAnimate, animEnabled]);

  const themedAreas = useMemo(
    () => PRACTICE_AREA_DEFINITIONS.map((definition) => ({ definition })),
    []
  );

  const handleNext = () => {
    nudgeRef.current?.(1);
  };

  const handlePrev = () => {
    nudgeRef.current?.(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (!shouldAnimate) {
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nudgeRef.current?.(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nudgeRef.current?.(-1);
    }
  };

  return (
    <Section id="calisma-alanlari" className="bg-[hsl(var(--card))]">
      <SectionHeader label={t('label')} title={t('title')} description={t('description')} />

      <div className={styles.wrapper}>
        <div className={styles.gallery}>
          <ul
            ref={cardsRef}
            className={cn(styles.cards, !shouldAnimate && styles.cardsStatic)}
            aria-live="polite"
            aria-label={t('title')}
            tabIndex={shouldAnimate ? 0 : undefined}
            onKeyDown={shouldAnimate ? handleKeyDown : undefined}
          >
            {themedAreas.map(({ definition }) => {
              const Icon = Icons[definition.icon as keyof typeof Icons];
              const href = `/calisma-alanlari/${definition.segment}`;
              const style = {
                '--practice-card-from': 'color-mix(in hsl, hsl(var(--card)) 94%, black 6%)',
                '--practice-card-to': 'color-mix(in hsl, hsl(var(--card)) 82%, black 18%)',
                '--practice-card-accent': 'hsl(var(--gold))'
              } as CSSProperties;

              return (
                <li
                  key={definition.key}
                  className={cn(styles.card, !shouldAnimate && styles.cardStatic)}
                  style={style}
                >
                  <span className={styles.accentRing} aria-hidden="true" />
                  <Link
                    href={href as any}
                    className={styles.cardLink}
                    aria-label={tSlider('openArea', { area: tItems(`${definition.key}.title`) })}
                  >
                    <div>
                      <span className={styles.icon} aria-hidden="true">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className={styles.title}>{tItems(`${definition.key}.title`)}</h3>
                      <p className={styles.description}>{tItems(`${definition.key}.description`)}</p>
                    </div>
                    <span className={styles.cta}>
                      {tCommon('viewDetails')}
                      <Icons.arrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {shouldAnimate && (
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.actionButton}
                aria-label={tSlider('previous')}
                onClick={handlePrev}
              >
                <Icons.arrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className={styles.actionButton}
                aria-label={tSlider('next')}
                onClick={handleNext}
              >
                <Icons.arrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {!shouldAnimate && <p className={styles.mobileHint}>{tSlider('hint')}</p>}
        <div ref={dragProxyRef} className={styles.dragProxy} />
      </div>
    </Section>
  );
}
