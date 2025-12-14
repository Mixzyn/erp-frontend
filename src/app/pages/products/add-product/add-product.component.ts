import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  
  imagePreview: string = "img/products/sem-imagem.jpg";
  addProductForm!: FormGroup;
  addProductFailed: boolean = false;

  constructor(private fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      description: [null, Validators.required],
      code: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null]
    })
  }

  get description() { return this.addProductForm.get('description') }
  get code() { return this.addProductForm.get('code') }
  get price() { return this.addProductForm.get('price') }
  get imagePath() { return this.addProductForm.get('imagePath') }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const imagePath = input.files[0];
      this.addProductForm.patchValue({ imagePath: imagePath });
      this.addProductForm.get('imagePath')?.updateValueAndValidity();

      // gera um preview para a imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(imagePath);
    }
  }

  async onSubmit() {
    const addProduct = await this.productService.addProduct({ id: null, descricao: this.description!.value, codigo: this.code!.value, precoUnitario: this.price!.value, imagePath: this.imagePath?.value });

    if (addProduct) {
      this.router.navigateByUrl("produtos");
      return;
    }

    this.addProductFailed = true;
  }
}
