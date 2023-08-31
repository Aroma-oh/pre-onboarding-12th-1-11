import { useEffect, useRef } from "react";

interface Options {
  root: Element | null;
  rootMargin: string;
  threshold: number;
}

const options: Options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
}

export const useInfiniteScroll = (handlePageNumber: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        handlePageNumber();
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, [ref.current]);

  return (ref)
}
