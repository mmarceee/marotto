import { Component } from '@angular/core';
import { TECHNOLOGY_GROUPS } from '../../data/content';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-technologies',
  imports: [Reveal, SectionHeading],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
})
export class Technologies {
  protected readonly groups = TECHNOLOGY_GROUPS;

  /** Columnas en teléfono: 3 si el grupo tiene 3 ítems, para no dejar uno suelto; si no, 2. */
  protected mobileColumns(count: number): number {
    return count === 3 ? 3 : 2;
  }
}
