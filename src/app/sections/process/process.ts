import { Component } from '@angular/core';
import { PROCESS_STEPS } from '../../data/content';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-process',
  imports: [Reveal, SectionHeading],
  templateUrl: './process.html',
  styleUrl: './process.scss',
})
export class Process {
  protected readonly steps = PROCESS_STEPS;
}
