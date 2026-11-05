import { Component, DestroyRef, computed, inject, signal } from '@angular/core';

type Tone = 'prompt' | 'cmd' | 'out' | 'ok' | 'kw' | 'str' | 'txt';

interface ScriptLine {
  segments: [text: string, tone: Tone][];
  /** Las salidas de comandos aparecen de una vez, sin tipeo. */
  instant?: boolean;
  /** Ticks de espera después de la línea. */
  pause?: number;
}

interface RenderedLine {
  segments: { text: string; tone: Tone }[];
  active: boolean;
}

const SCRIPT: ScriptLine[] = [
  { pause: 12, segments: [['> ', 'prompt'], ['marotto init tu-proyecto', 'cmd']] },
  { instant: true, pause: 8, segments: [['  analizando requerimientos... ', 'out'], ['ok', 'ok']] },
  { instant: true, pause: 14, segments: [['  definiendo arquitectura...   ', 'out'], ['ok', 'ok']] },
  { instant: true, segments: [] },
  { segments: [['const ', 'kw'], ['proyecto = {', 'txt']] },
  { segments: [['  cliente: ', 'txt'], ['"vos"', 'str'], [',', 'txt']] },
  { segments: [['  codigo: ', 'txt'], ['"a medida"', 'str'], [',', 'txt']] },
  { segments: [['  seguro: ', 'txt'], ['true', 'kw'], [',', 'txt']] },
  { pause: 14, segments: [['};', 'txt']] },
  { instant: true, segments: [] },
  { pause: 12, segments: [['> ', 'prompt'], ['marotto deploy --produccion', 'cmd']] },
  {
    instant: true,
    pause: 8,
    segments: [['  build ', 'out'], ['ok', 'ok'], ['  ·  tests ', 'out'], ['ok', 'ok']],
  },
  { instant: true, segments: [['> ', 'prompt']] },
];

const lineLength = (line: ScriptLine) => line.segments.reduce((n, [text]) => n + text.length, 0);
const lineCost = (line: ScriptLine) => (line.instant ? 1 : lineLength(line));
const TOTAL_TICKS = SCRIPT.reduce((n, line) => n + lineCost(line) + (line.pause ?? 0), 0);
const TICK_MS = 32;

/** Ventana de terminal decorativa que tipea el guion de arriba una sola vez. */
@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
})
export class Terminal {
  private readonly ticks = signal(0);

  protected readonly lines = computed<RenderedLine[]>(() => {
    let left = this.ticks();
    let activeSet = false;
    return SCRIPT.map((line, index) => {
      const length = lineLength(line);
      const cost = lineCost(line);
      let shown = line.instant ? (left >= 1 ? length : 0) : Math.min(left, length);
      const done = left >= cost + (line.pause ?? 0);
      const active = !activeSet && (!done || index === SCRIPT.length - 1);
      if (active) activeSet = true;
      left = Math.max(0, left - cost - (line.pause ?? 0));

      const segments = line.segments.map(([text, tone]) => {
        const visible = text.slice(0, shown);
        shown -= visible.length;
        return { text: visible, tone };
      });
      return { segments, active };
    });
  });

  constructor() {
    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      this.ticks.set(TOTAL_TICKS);
      return;
    }

    const timer = setInterval(() => {
      if (this.ticks() >= TOTAL_TICKS) {
        clearInterval(timer);
        return;
      }
      this.ticks.update((n) => n + 1);
    }, TICK_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
