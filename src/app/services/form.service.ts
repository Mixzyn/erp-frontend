import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class formService {
  isInvalid(control: AbstractControl): boolean {
    if (control?.invalid && (control.dirty || control.touched)) {
      return true;
    }

    return false;
  }

  isValid(control: AbstractControl): boolean {
    if (!control?.invalid && (control?.dirty || control?.touched)) {
      return true;
    }

    return false;
  }
}
