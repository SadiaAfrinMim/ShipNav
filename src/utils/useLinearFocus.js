import { useRef } from "react";

export default function useLinearFocus() {
  const fieldRefs = useRef([]);
  const indexSeed = useRef(0);
  indexSeed.current = 0;

  const isPopupOpen = () => {
    return Boolean(
      document.querySelector(
        ".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
      ) ||
      document.querySelector(
        ".ant-picker-dropdown:not(.ant-picker-dropdown-hidden)"
      ) ||
      document.querySelector(".ant-picker-panel")
    );
  };

  const findFocusableChild = (el) => {
    if (!el || !(el.querySelector)) return null;
    const sel =
      'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return el.querySelector(sel);
  };

  const focusAt = (idx) => {
    const ref = fieldRefs.current[idx];
    if (!ref) return;

    try {
      if (ref instanceof HTMLElement) {
        const child = findFocusableChild(ref);
        if (child) {
          child.focus();
          return;
        }
        if (typeof ref.focus === "function") {
          ref.focus();
          return;
        }
      }

      if (ref && typeof ref === "object") {
        if (typeof ref.focus === "function") {
          ref.focus();
          return;
        }
        if (ref.input) {
          const candidate = ref.input?.input || ref.input;
          if (candidate && typeof candidate.focus === "function") {
            candidate.focus();
            return;
          }
        }
        if (ref.picker && typeof ref.picker.focus === "function") {
          ref.picker.focus();
          return;
        }
        if (ref.current instanceof HTMLElement) {
          const child = findFocusableChild(ref.current);
          if (child) {
            child.focus();
            return;
          }
          ref.current.focus && ref.current.focus();
          return;
        }
      }
    } catch (err) {
      // ignore
    }
  };

  const focusNext = (idx) => {
    for (let i = idx + 1; i < fieldRefs.current.length; i++) {
      if (fieldRefs.current[i]) {
        focusAt(i);
        return;
      }
    }
  };

  const focusPrev = (idx) => {
    for (let i = idx - 1; i >= 0; i--) {
      if (fieldRefs.current[i]) {
        focusAt(i);
        return;
      }
    }
  };

  const focusFirst = () => {
    for (let i = 0; i < fieldRefs.current.length; i++) {
      if (fieldRefs.current[i]) {
        focusAt(i);
        return;
      }
    }
  };

  const handleNavKey = (e, idx, advanceOnEnter) => {
    // Tab / Shift+Tab always move
    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        focusPrev(idx);
      } else {
        focusNext(idx);
      }
      return;
    }

    // If a popup is open (select / datepicker), don't hijack other keys
    if (isPopupOpen()) return;

    // Enter to advance (only when configured)
    if (advanceOnEnter && e.key === "Enter") {
      e.preventDefault();
      focusNext(idx);
    }
  };

  const getNavProps = (opts = {}) => {
    const { advanceOnEnter = false } = opts;
    const idx = indexSeed.current++;
    return {
      ref: (el) => {
        fieldRefs.current[idx] = el || null;
      },
      onKeyDown: (e) => handleNavKey(e, idx, advanceOnEnter),
      "data-nav-index": idx,
    };
  };

  const onSelectAdvance = (idx) => () => {
    setTimeout(() => focusNext(idx), 50);
  };

  return {
    focusAt,
    focusFirst,
    isPopupOpen,
    getNavProps,
    onSelectAdvance,
    focusNext,
    focusPrev,
    handleNavKey,
  };
}
