import { useEffect } from "react";

export function useReveal(deps = []) {
  useEffect(() => {
    const items = document.querySelectorAll(
      '.reveal-item:not([data-revealed="true"])',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.dataset.revealed = "true";
              entry.target.classList.add("visible");
            }, i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
