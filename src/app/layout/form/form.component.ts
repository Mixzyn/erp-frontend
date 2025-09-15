import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  title = input<string>();
  imgSrc = input<string>();
  imgAlt = input<string>();
  buttonText = input<string>();
  submit = output<void>();

  emitSubmit() {
    this.submit.emit();
  }
}
