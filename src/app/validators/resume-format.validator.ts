import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// validateResumeFormat is a constant variable that holds a function. (anonymous function)
// export const validateResumeFormat: ValidatorFn = (control: AbstractControl): ValidationErrors | null  => {
//     const allowedFormats = ['pdf', 'docx'];
//     const file = control.value as File;
//     if (file) {
    
//     // .pop() removes the last element from the array and returns it, which in this case would be the file extension.
//       const extension = file.name.split('.').pop()?.toLowerCase();
//       if (extension && !allowedFormats.includes(extension)) {
//         return { invalidFormat: true };
//       }
//     }
//     return null; // Return null if the file format is valid
// };

export const validateResumeFormat: ValidatorFn = (control: AbstractControl): ValidationErrors | null  => {
    const allowedFormats = ['pdf', 'docx'];
    const file = control.value as File;
    if (file) {
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (extension && !allowedFormats.includes(extension)) {
            return { invalidFormat: true };
        }
    }
    return null;
};
