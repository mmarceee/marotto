import { Component } from '@angular/core';
import { TEAM } from '../../data/content';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-about',
  imports: [Reveal, SectionHeading],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly team = TEAM;
}
