import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '../../../layout/form/form.component';

@Component({
  selector: 'app-add-product',
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  addProductForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    code: new FormControl<string>('', Validators.required),
    category: new FormControl<string>('', Validators.required),
    price: new FormControl<string>('', Validators.required),
    manufacturer: new FormControl<string>('', Validators.required),
  })

  onSubmit() {
    console.log("bolado");
  }
}
