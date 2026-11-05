import { Component } from '@angular/core';
import { SHOW_PROJECTS } from '../../data/content';
import { Terminal } from './terminal/terminal';

@Component({
  selector: 'app-hero',
  imports: [Terminal],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly showProjects = SHOW_PROJECTS;
}
