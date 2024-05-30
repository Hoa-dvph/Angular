import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
@Injectable()
export class ProductAddComponent implements OnInit {

  categories: any[] = [];
  successMessage: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  addProductForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    productCode: new FormControl(''),
    imageUrl: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0.01)]), // Sử dụng Validators.min để đảm bảo giá trị > 0
    showProduct: new FormControl(true)
  });


  handleSubmit() {
    // Kiểm tra xem form có hợp lệ không
    if (this.addProductForm.invalid) {
      // Nếu form không hợp lệ, hiển thị thông báo lỗi
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Nếu form hợp lệ, tiến hành thêm sản phẩm
    const newProduct = { ...this.addProductForm.value, id: this.productService.generateProductId().toString() };
    console.log("New product:", newProduct);

    this.productService.addProduct(newProduct).subscribe({
      next: () => {
        alert("Thêm sản phẩm thành công ");
        this.router.navigate(['/admin/products/list']);
      },
      error: (error) => {
        alert("Đã xảy ra lỗi khi thêm sản phẩm: " + error.message);
        console.error(error.message);
      },
    });
  }


  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });

  }
  back() {
    this.router.navigate(['/admin/products/list']);
  }

}