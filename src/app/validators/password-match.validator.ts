import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// passwordMatchValidator is a constant variable that holds a function. (anonymous function)
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

// When the passwords don't match, the validator function returns an object with a key 'passwordMismatch' set to true,
// indicating that a validation error of type 'passwordMismatch' has occurred.
// If the passwords match, the function returns null, indicating that there are no validation errors.

  return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
};


// // another syntax (non anonymous fn):
// export function passwordMatchValidator(control: FormGroup): ValidationErrors | null {
//     const password = control.get('password');
//     const confirmPassword = control.get('confirmPassword');
  
//     return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
//   }