/**
 * SplitProjectHighlight.jsx
 *
 * Minimalistic Split-Screen Project Highlight component.
 *
 * Props:
 * - projects: Array<{
 *     id: string;
 *     title: string;
 *     role: string;
 *     desc: string;
 *     year: string;
 *     type: string;
 *     stack: string;
 *     img: string;
 *     thumbs?: string[];
 *     liveUrl?: string;
 *     caseUrl?: string;
 *   }>
 * - initialIndex?: number (default 0)
 * - onOpenCase?: (project) => void
 * - className?: string
 *
 * Features:
 * - Split screen layout: left = text & controls, right = hero image & thumbnails
 * - Smooth fade/slide transitions between projects
 * - Keyboard navigation: Left/Right arrows switch projects
 * - Thumbnails & prev/next buttons change project
 * - Accessible: region landmark, aria-live announcements, focus-visible styles
 *
 * Integration:
 * - Import the CSS in your app entry or alongside this component:
 *   import './SplitProjectHighlight.css';
 *
 * - Use:
 *   import SplitProjectHighlight from './SplitProjectHighlight';
 *   <SplitProjectHighlight projects={projects} initialIndex={0} />
 */

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import './SplitProjectHighlight.css';

function getChips(project) {
  const chips = [];
  if (project.year) chips.push(project.year);
  if (project.type) chips.push(project.type);
  if (project.role) chips.push(project.role);
  return chips;
}

const ANIM_DURATION_MS = 480;

export default function SplitProjectHighlight({
  projects,
  initialIndex = 0,
  onOpenCase,
  className = '',
}) {
  const safeInitial = useMemo(
    () => Math.min(Math.max(initialIndex, 0), Math.max((projects?.length || 1) - 1, 0)),
    [initialIndex, projects]
  );

  const [index, setIndex] = useState(safeInitial);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const projectCount = projects?.length || 0;
  const current = projectCount > 0 ? projects[index] : null;
  const currentChips = current ? getChips(current) : [];
  const currentThumbs =
    current && current.thumbs && current.thumbs.length > 0 ? current.thumbs : current ? [current.img] : [];

  // Ensure index stays in range if projects prop changes
  useEffect(() => {
    if (!projects || projects.length === 0) return;
    setIndex((prev) => Math.min(prev, projects.length - 1));
  }, [projects]);

  const goTo = useCallback(
    (nextIndex) => {
      if (!projects || projects.length === 0) return;
      const normalized = ((nextIndex % projects.length) + projects.length) % projects.length;
      if (normalized === index) return;
      setDirection(normalized > index ? 1 : -1);
      setAnimating(true);
      setIndex(normalized);
      // stop animating after duration
      window.setTimeout(() => setAnimating(false), ANIM_DURATION_MS);
    },
    [index, projects]
  );

  const handlePrev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  const handleNext = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  // Keyboard navigation (Left/Right arrows)
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  const handleCaseClick = useCallback(() => {
    if (!current) return;
    if (onOpenCase) {
      onOpenCase(current);
    } else if (current.caseUrl) {
      window.open(current.caseUrl, '_blank', 'noopener,noreferrer');
    }
  }, [current, onOpenCase]);

  const handleLiveClick = useCallback(() => {
    if (!current || !current.liveUrl) return;
    window.open(current.liveUrl, '_blank', 'noopener,noreferrer');
  }, [current]);

  const rootClasses = ['sph-root', className].filter(Boolean).join(' ');

  if (!current) {
    return (
      <section className={rootClasses} aria-label="Featured projects">
        <div className="sph-container">
          <div className="sph-grid">
            <div className="sph-left">
              <p className="sph-desc">No projects available.</p>
            </div>
            <div className="sph-right" />
          </div>
        </div>
      </section>
    );
  }

  // Animation helper classes
  const animClass = animating
    ? direction === 1
      ? 'sph-slide-fade-enter-active'
      : 'sph-slide-fade-exit-active'
    : '';

  return (
    <section
      className={rootClasses}
      aria-label="Featured projects"
      role="region"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="sph-container">
        <div className="sph-grid">
          {/* LEFT: Copy & controls */}
          <div className={`sph-left ${animClass}`}>
            <div>
              <div className="sph-eyebrow">
                <span className="sph-dot" aria-hidden="true" />
                FEATURED PROJECT
              </div>
              <h2 className="sph-title">{current.title}</h2>
              <div className="sph-meta" aria-label="Project meta">
                <div className="sph-meta-pill">
                  <span className="sph-meta-dot" aria-hidden="true" />
                  <span>{current.role}</span>
                </div>
                {current.year && <span>{current.year}</span>}
                {current.type && <span>{current.type}</span>}
              </div>
            </div>

            <p className="sph-desc">{current.desc}</p>

            {current.stack && (
              <div className="sph-stack">
                <span className="sph-sr-only">Tech stack:</span>
                {current.stack}
              </div>
            )}

            {currentChips.length > 0 && (
              <div className="sph-chips" aria-label="Project tags">
                {currentChips.map((chip) => (
                  <span key={chip} className="sph-chip">
                    {chip}
                  </span>
                ))}
              </div>
            )}

            <div>
              <div className="sph-cta-row" aria-label="Project actions">
                {current.caseUrl || onOpenCase ? (
                  <button type="button" className="sph-btn-primary" onClick={handleCaseClick}>
                    View Case Study
                    <span aria-hidden="true">↗</span>
                  </button>
                ) : null}

                {current.liveUrl && (
                  <button type="button" className="sph-btn-ghost" onClick={handleLiveClick}>
                    Open Live
                    <span aria-hidden="true">↗</span>
                  </button>
                )}
              </div>

              <div className="sph-nav-row" aria-label="Project navigation">
                <button
                  type="button"
                  className="sph-nav-btn"
                  onClick={handlePrev}
                  aria-label="Previous project"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="sph-nav-btn"
                  onClick={handleNext}
                  aria-label="Next project"
                >
                  ›
                </button>
                <span className="sph-counter" aria-live="polite">
                  {index + 1} / {projectCount}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Hero image + thumbnails */}
          <div className={`sph-right ${animClass}`}>
            <div
              className="sph-hero-wrapper"
              aria-live="polite"
              aria-label={`${current.title} — ${current.role}`}
            >
              <div className="sph-hero-inner">
                <img
                  key={current.id}
                  src={current.img}
                  alt=""
                  role="img"
                  aria-label={`${current.title} hero visual`}
                  className="sph-hero-img"
                />
                <div className="sph-hero-overlay" aria-hidden="true" />
                <div className="sph-hero-label">
                  <span className="sph-hero-label-dot" aria-hidden="true" />
                  <span>Highlighted • {current.year || 'Upcoming'}</span>
                </div>
              </div>
            </div>

            <div className="sph-thumbs" aria-label="Project thumbnails">
              <div className="sph-thumbs-strip">
                {projects.map((p, i) => {
                  const thumbSrc =
                    p.thumbs && p.thumbs.length > 0 ? p.thumbs[0] : p.img;
                  const isActive = i === index;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className={`sph-thumb-btn ${isActive ? 'sph-thumb-btn--active' : ''}`}
                      aria-label={`View project: ${p.title}`}
                      aria-pressed={isActive}
                      onClick={() => goTo(i)}
                    >
                      <img src={thumbSrc} alt="" />
                      <span className="sph-thumb-indicator" aria-hidden="true" />
                      <span className="sph-sr-only">{p.title}</span>
                    </button>
                  );
                })}
              </div>
              <div className="sph-thumb-caption" aria-hidden="true">
                Use ← → or click thumbnails to rotate projects.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


