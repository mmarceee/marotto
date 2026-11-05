import { Component } from '@angular/core';
import { SHOW_PROJECTS } from './data/content';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Hero } from './sections/hero/hero';
import { Process } from './sections/process/process';
import { Projects } from './sections/projects/projects';
import { Services } from './sections/services/services';
import { Technologies } from './sections/technologies/technologies';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';

@Component({
  imports: [Header, Hero, Services, Technologies, Process, Projects, About, Contact, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly showProjects = SHOW_PROJECTS;
}
