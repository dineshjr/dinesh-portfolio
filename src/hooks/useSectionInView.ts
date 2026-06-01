import { useState, useEffect, useRef } from "react";
import type { SectionId } from "@/types";

export function useSectionInView(sectionIds: SectionId[], threshold = 0.4) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold, rootMargin: "-10% 0px -10% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sectionIds, threshold]);

  return activeSection;
}