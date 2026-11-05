import { TestBed } from '@angular/core/testing';
import { Contact } from './contact';

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

  it('shows the success message for a valid form', async () => {
    const { fixture, el } = await render();
    type(el, 'campo-nombre', '  Ana ');
    type(el, 'campo-email', 'ana@correo.com');
    type(el, 'campo-mensaje', 'Necesito un sistema de turnos.');
    el.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    await fixture.whenStable();

    expect(el.querySelector('[role="status"]')?.textContent).toContain('Gracias, Ana.');
    expect(el.querySelector('form')).toBeNull();
  });
});
