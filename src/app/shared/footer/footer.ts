import { Component } from '@angular/core';
import { SOCIAL_LINKS } from '../../data/content';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly socials = SOCIAL_LINKS;
}
