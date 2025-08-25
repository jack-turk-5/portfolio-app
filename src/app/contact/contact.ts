import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from './contact.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly snackBar = inject(MatSnackBar);

  public contactForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  public onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService
        .sendContactForm(this.contactForm.value)
        .subscribe({
          next: () => {
            this.snackBar.open('Message sent successfully!', 'Close', {
              duration: 5000,
            });
            this.contactForm.reset();
            // Reset form controls to their initial state, clearing validators
            Object.keys(this.contactForm.controls).forEach(key => {
              this.contactForm.get(key)?.setErrors(null) ;
              this.contactForm.get(key)?.markAsUntouched();
              this.contactForm.get(key)?.markAsPristine();
            });
          },
          error: (error) => {
            console.error('Error submitting form:', error);
            this.snackBar.open('Failed to send message. Please try again later.', 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar'] // Optional: for custom styling
            });
          },
        });
    }
  }
}
