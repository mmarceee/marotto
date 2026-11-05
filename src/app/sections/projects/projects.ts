import { Component } from '@angular/core';
import { PROJECTS } from '../../data/content';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

/** Oculta por ahora: se muestra con SHOW_PROJECTS en data/content.ts. */
@Component({
  selector: 'app-projects',
  imports: [Reveal, SectionHeading],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly projects = PROJECTS;
}
