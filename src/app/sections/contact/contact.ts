import { Component, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CONTACT } from '../../data/content';
import { Reveal } from '../../shared/reveal.directive';

type ContactField = 'nombre' | 'email' | 'mensaje';

const FIELDS: ContactField[] = ['nombre', 'email', 'mensaje'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  /** Nombre de quien envió el último mensaje; null mientras se muestra el formulario. */
  protected readonly sentBy = signal<string | null>(null);

  protected showError(field: ContactField): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const firstInvalid = FIELDS.find((field) => this.form.controls[field].invalid);
      document.getElementById(`campo-${firstInvalid}`)?.focus();
      return;
    }

    // Por ahora no se envía a ningún servicio: solo se confirma en pantalla.
    this.sentBy.set(this.form.getRawValue().nombre.trim());
    this.form.reset();
    this.submitted.set(false);
  }

  protected sendAnother(): void {
    this.sentBy.set(null);
  }
}
