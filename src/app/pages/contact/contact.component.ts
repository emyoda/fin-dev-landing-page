import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ReactiveFormsModule,
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import parsePhoneNumberFromString from 'libphonenumber-js';
import emailjs from '@emailjs/browser';

import { FooterComponent } from '../shared/footer/footer.component';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../shared/services/notification-service';
import { MatrixRainComponent } from '../shared/matrix-canvas/matrix-canvas.component';

interface ContactComponentForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  message: FormControl<string | null>;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FooterComponent,
    MatrixRainComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  form: FormGroup<ContactComponentForm> = new FormGroup({
    name: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: this.fb.control('', [this.phoneValidator()]),
    message: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(2056),
      ],
    }),
  });

  get nameControl(): FormControl<string | null> {
    return this.form.get('name') as FormControl<string | null>;
  }

  get emailControl(): FormControl<string | null> {
    return this.form.get('email') as FormControl<string | null>;
  }

  get phoneControl(): FormControl<string | null> {
    return this.form.get('phone') as FormControl<string | null>;
  }

  get messageControl(): FormControl<string | null> {
    return this.form.get('message') as FormControl<string | null>;
  }

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
  ) {}

  async onSubmit() {
    emailjs.init(environment.publicKeyEmailJs);
    try {
      await emailjs.send(environment.serviceId, environment.templateId, {
        name: this.nameControl.value ?? '',
        email: this.emailControl.value ?? '',
        phone: this.phoneControl.value ?? '',
        message: this.messageControl.value ?? '',
      });
      this.notificationService.showNormalMessage(
        'Thank you for submitting form, We will contact you soon',
      );
    } catch (err) {
      console.error('Err => ', err);
      if (err) {
        this.notificationService.showErrorMessage(
          'Error while submitting form, Please try again or contact us directly via email',
        );
      }
    } finally {
      this.form.reset();
    }
  }

  private phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!!control.value) {
        const phoneNumber = parsePhoneNumberFromString(control.value);

        // Check if the phone number is valid
        const isValid = phoneNumber ? phoneNumber.isValid() : false;

        // Return validation result
        return isValid ? null : { invalidNumber: true };
      } else {
        return null;
      }
    };
  }

  getErrorEmail() {
    if (this.emailControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorName() {
    return this.nameControl.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  getErrorMessage() {
    if (this.messageControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.messageControl.hasError('maxlength')) {
      return 'Max length exceeded';
    }
    return this.messageControl.hasError('minlength') ? 'Message too short' : '';
  }

  getPhoneErrorMessage() {
    if (this.phoneControl.hasError('invalidNumber')) {
      return 'Invalid phone number format';
    }
    return '';
  }
}
