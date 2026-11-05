import { Component } from '@angular/core';
import { SERVICES } from '../../data/content';
import { Reveal } from '../../shared/reveal.directive';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-services',
  imports: [Reveal, SectionHeading],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly services = SERVICES;
}
