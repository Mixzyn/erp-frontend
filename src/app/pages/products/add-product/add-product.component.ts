import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '../../../layout/form/form.component';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  addProductFailed: boolean = false;

  addProductForm: FormGroup = new FormGroup({
    description: new FormControl<string>('', Validators.required),
    code: new FormControl<string>('', Validators.required),
    price: new FormControl<string>('', Validators.required),
  })

  get description() { return this.addProductForm.get('description') }
  get code() { return this.addProductForm.get('code') }
  get price() { return this.addProductForm.get('price') }

  async onSubmit() {
    const addProduct = await this.productService.addProduct({ descricao: this.description!.value, codigo: this.code!.value, precoUnitario: this.price!.value });

    if (addProduct) {
      this.router.navigateByUrl("home");
      return;
    }

    this.addProductFailed = true;
  }
}
