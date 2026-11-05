import { Component, input } from '@angular/core';
import { Reveal } from '../reveal.directive';

/** Etiqueta tipo <servicios/>, título h2 y bajada opcional. */
@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
  template: `
    <div class="heading" appReveal>
      <p class="heading__tag mono">&lt;{{ tag() }}/&gt;</p>
      <h2 class="heading__title" [id]="headingId()">{{ title() }}</h2>
      @if (lead()) {
        <p class="heading__lead">{{ lead() }}</p>
      }
    </div>
  `,
  styles: `
    .heading {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .heading__tag {
      font-size: 0.875rem;
      color: var(--color-accent-soft);
    }
    .heading__title {
      font-size: var(--text-h2);
      line-height: 1.15;
      font-weight: 600;
      letter-spacing: -0.02em;
      text-wrap: balance;
    }
    .heading__lead {
      max-width: 34em;
      font-size: 1.0625rem;
      color: var(--color-text-soft);
      text-wrap: pretty;
    }
  `,
})
export class SectionHeading {
  readonly tag = input.required<string>();
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
  readonly lead = input<string>();
}
