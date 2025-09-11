import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';
import { FormComponent } from '../../../layout/form/form.component';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-single-product',
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  product = input.required<Product>();
  editProductFailed: Boolean = false;

  editProductForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const product = this.product();
    this.editProductForm = this.fb.group({
      description: [product.descricao, Validators.required],
      code: [product.codigo, Validators.required],
      price: [product.precoUnitario, Validators.required],
    })
  }

  onSubmit() {

  }
}
