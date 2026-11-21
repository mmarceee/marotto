import { Component, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CONTACT } from '../../data/content';
import { Reveal } from '../../shared/reveal.directive';

type ContactField = 'nombre' | 'email' | 'mensaje';

const FIELDS: ContactField[] = ['nombre', 'email', 'mensaje'];
const EMAIL_PATTERN = /^[^\s@<>,;:()\[\]"\\]+@[^\s@<>,;:()\[\]"\\]+\.[^\s@<>,;:()\[\]"\\]+$/;

/** Como minLength, pero sin contar espacios al principio y al final. */
function minTrimmedLength(min: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null =>
    control.value.trim().length >= min ? null : { minTrimmedLength: { min } };
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly contact = CONTACT;
  protected readonly form = this.fb.group({
    nombre: ['', [minTrimmedLength(2)]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    mensaje: ['', [minTrimmedLength(10)]],
  });
  protected readonly submitted = signal(false);
  protected readonly sending = signal(false);
  protected readonly sendError = signal('');
  /** Nombre de quien envió el último mensaje; null mientras se muestra el formulario. */
  protected readonly sentBy = signal<string | null>(null);

  protected showError(field: ContactField): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  protected async submit(): Promise<void> {
    if (this.sending()) return;

    this.sendError.set('');
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const firstInvalid = FIELDS.find((field) => this.form.controls[field].invalid);
      document.getElementById(`campo-${firstInvalid}`)?.focus();
      return;
    }

    const { nombre, email, mensaje } = this.form.getRawValue();
    this.sending.set(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), mensaje: mensaje.trim() }),
      });
      if (response.status !== 204) {
        this.sendError.set(response.status === 429
          ? 'Hubo demasiados intentos. Esperá unos minutos y volvé a probar.'
          : 'No pudimos enviar tu mensaje. Volvé a intentar o escribinos por WhatsApp.');
        return;
      }

      this.sentBy.set(nombre.trim());
      this.form.reset();
      this.submitted.set(false);
    } catch {
      this.sendError.set('No pudimos enviar tu mensaje. Volvé a intentar o escribinos por WhatsApp.');
    } finally {
      this.sending.set(false);
    }
  }

  protected sendAnother(): void {
    this.sentBy.set(null);
  }
}
