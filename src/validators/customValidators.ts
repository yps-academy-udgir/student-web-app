import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  // This validator checks if the password and confirmPassword fields match.
 static passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    // Clear previous mismatch error
    if (confirmPassword.errors?.['passwordMismatch']) {
      const { passwordMismatch, ...remainingErrors } = confirmPassword.errors;
      confirmPassword.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
    }

    // Set new error if mismatch
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  };
}


}