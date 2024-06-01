import { Component, Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
@Injectable()
export class ProductEditComponent {
  categories: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  editProductForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    productCode: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0.01)]), // Sử dụng Validators.min để đảm bảo giá trị > 0
    showProduct: new FormControl(true)
  });

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    const productId = +this.route.snapshot.params['id'];
    this.productService.getProductDetail(productId).subscribe(product => {
      this.editProductForm.patchValue(product);
    });
  }

  handleEdit() {
    if (this.editProductForm.invalid) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }

    const productId = +this.route.snapshot.params['id'];
    this.productService.editProduct(this.editProductForm.value, productId).subscribe({
      next: () => {
        alert('Sửa sản phẩm thành công!');
        this.router.navigate(['/admin/products/list']);
      },
      error: (error) => {
        this.errorMessage = 'Đã xảy ra lỗi khi sửa sản phẩm: ' + error.message;
        console.error(error.message);
      },
    });
  }
  back() {
    this.router.navigate(['/admin/products/list']);
  }
}