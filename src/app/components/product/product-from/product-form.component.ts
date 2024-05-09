import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-product-from',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  productForm: FormGroup;
  fb = inject(FormBuilder);
  productService = inject(ProductService);

  constructor() {
    this.productForm = this.fb.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    });
  }

  public add(): void {
    const partialProduct: Partial<Product> = this.productForm.value;
    this.productService.add(partialProduct)
      .subscribe((product: Product) => {
        this.productForm.reset();
        alert(`El producto ${product.title} ha sido guardado exitosamente.`);
      });
  }

}
