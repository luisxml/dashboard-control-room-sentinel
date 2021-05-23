import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numeric(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (value === '') {
            return null;
        }

        return !regexp.test(value) ? { 'numericInvalid': { regexp } } : null;
    };
}

export function letter(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (value === '') {
            return null;
        }

        return !regexp.test(value) ? { 'letterInvalid': { regexp } } : null;
    };
}

export function alphanumeric(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (value === '') {
            return null;
        }

        return !regexp.test(value) ? { 'alphanumericInvalid': { regexp } } : null;
    };
}

export function date(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (value === '') {
            return null;
        }

        return !regexp.test(value) ? { 'dateInvalid': { regexp } } : null;
    };
}

export function email(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (value === '') {
            return null;
        }

        return !regexp.test(value) ? { 'emailInvalid': { regexp } } : null;
    };
}
