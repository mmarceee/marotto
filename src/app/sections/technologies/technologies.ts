import { Component } from '@angular/core';
import { TECHNOLOGIES } from '../../data/content';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-technologies',
  imports: [Reveal, SectionHeading],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
})
export class Technologies {
  protected readonly technologies = TECHNOLOGIES;
}
