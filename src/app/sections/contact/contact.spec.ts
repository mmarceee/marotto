import { TestBed } from '@angular/core/testing';
import { afterEach, vi } from 'vitest';
import { Contact } from './contact';

afterEach(() => vi.unstubAllGlobals());

describe('Contact', () => {
  async function render() {
    await TestBed.configureTestingModule({ imports: [Contact] }).compileComponents();
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  function type(el: HTMLElement, id: string, value: string) {
    const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${id}`)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  it('shows every error and stays on the form when submitted empty', async () => {
    const { fixture, el } = await render();
    el.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(el.querySelector('#error-nombre')).not.toBeNull();
    expect(el.querySelector('#error-email')).not.toBeNull();
    expect(el.querySelector('#error-mensaje')).not.toBeNull();
    expect(el.querySelector('[role="status"]')).toBeNull();
  });

  it('rejects an email without a domain', async () => {
    const { fixture, el } = await render();
    type(el, 'campo-nombre', 'Ana');
    type(el, 'campo-email', 'ana@correo');
    type(el, 'campo-mensaje', 'Necesito un sistema de turnos.');
    el.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(el.querySelector('#error-email')).not.toBeNull();
    expect(el.querySelector('#error-nombre')).toBeNull();
  });

  it('sends the form and confirms after the server accepts it', async () => {
    const send = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', send);
    const { fixture, el } = await render();
    type(el, 'campo-nombre', '  Ana ');
    type(el, 'campo-email', 'ana@correo.com');
    type(el, 'campo-mensaje', 'Necesito un sistema de turnos.');
    el.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(send).toHaveBeenCalledOnce();
    const [url, request] = send.mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(request.method).toBe('POST');
    expect(JSON.parse(request.body)).toEqual({
      nombre: 'Ana',
      email: 'ana@correo.com',
      mensaje: 'Necesito un sistema de turnos.',
    });
    expect(el.querySelector('[role="status"]')?.textContent).toContain('Gracias, Ana.');
    expect(el.querySelector('form')).toBeNull();
  });

  it('keeps the message and allows retrying if delivery fails', async () => {
    const send = vi.fn().mockResolvedValue(new Response(null, { status: 502 }));
    vi.stubGlobal('fetch', send);
    const { fixture, el } = await render();
    type(el, 'campo-nombre', 'Ana');
    type(el, 'campo-email', 'ana@correo.com');
    type(el, 'campo-mensaje', 'Necesito un sistema de turnos.');
    const button = el.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    button.click();
    await fixture.whenStable();

    expect(el.querySelector('[role="alert"]')?.textContent).toContain('No pudimos enviar');
    expect(el.querySelector<HTMLTextAreaElement>('#campo-mensaje')?.value).toBe('Necesito un sistema de turnos.');
    expect(el.querySelector('[role="status"]')).toBeNull();
    expect(button.disabled).toBe(false);
  });
});
