import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  title = input<string>();
  buttonText = input<string>();
  submit = output<void>();

  emitSubmit() {
    this.submit.emit();
  }
}
