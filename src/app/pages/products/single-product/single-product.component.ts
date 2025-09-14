import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/product';
import { FormComponent } from '../../../layout/form/form.component';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-single-product',
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  private router = inject(Router);
  private productService = inject(ProductService);

  product = input.required<Product>();
  editProductForm!: FormGroup;
  imagePreview: string = "img/products/sem-imagem.jpg";
  editProductFailed: boolean = false;


  constructor(private fb: FormBuilder) { }

  get description() { return this.editProductForm.get('description') }
  get code() { return this.editProductForm.get('code') }
  get price() { return this.editProductForm.get('price') }
  get imagePath() { return this.editProductForm.get('imagePath') }

  ngOnInit() {
    const product = this.product();

    if (!product) {
      this.router.navigateByUrl('produtos');
    }

    this.editProductForm = this.fb.group({
      description: [product.descricao, Validators.required],
      code: [product.codigo, Validators.required],
      price: [product.precoUnitario, Validators.required],
      imagePath: [product.imagePath]
    });

    this.imagePreview = this.productService.getProductImage(this.imagePath?.value);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const imagePath = input.files[0];
      this.editProductForm.patchValue({ imagePath: imagePath });
      this.imagePath?.updateValueAndValidity();

      // gera um preview para a imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(imagePath);
    }
  }


  onSubmit() {

  }

}
