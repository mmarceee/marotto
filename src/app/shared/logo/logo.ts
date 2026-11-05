import { Component, input } from '@angular/core';

/** Logo recreado en CSS: ">" y "tt" en degradé, cursor de bloque opcionalmente parpadeante. */
@Component({
  selector: 'app-logo',
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class Logo {
  readonly label = input('Marotto Software, ir al inicio');
  readonly size = input(26);
  readonly blink = input(false);
}
