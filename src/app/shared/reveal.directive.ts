import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/**
 * Hace aparecer el elemento la primera vez que entra en pantalla.
 * Sin IntersectionObserver o con prefers-reduced-motion el contenido queda visible tal cual.
 */
@Directive({
  selector: '[appReveal]',
})
export class Reveal {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || typeof IntersectionObserver === 'undefined') return;

    this.el.classList.add('reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(this.el);
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }
}
