import { Component, signal } from '@angular/core';
import { NAV_LINKS } from '../../data/content';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(document:keydown.escape)': 'close()',
  },
})
export class Header {
  protected readonly links = NAV_LINKS;
  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }
}
