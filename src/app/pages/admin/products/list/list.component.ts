import { Component, OnInit, inject } from '@angular/core';
import { IProduct } from '../../../../entities/products';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../../../services/product.service';
import { Router } from '@angular/router'; // Import Router from @angular/router

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule, NgxPaginationModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  listProduct: IProduct[] = [];
  allProducts: IProduct[] = [];
  filterValue: string = '';
  page: number = 1;

  constructor(
    private router: Router, // Inject Router in the constructor
    private productService: ProductService // Inject ProductService in the constructor
  ) { }
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        this.listProduct = products;
        this.allProducts = products;
        this.updatePage();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        alert('Đã xảy ra lỗi khi lấy danh sách sản phẩm. Vui lòng thử lại sau.');
      }
    );
  }

  deleteProduct(product: IProduct) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          alert('Xóa sản phẩm thành công.');
          this.loadProducts();
        },
        (error) => {
          console.error('Lỗi khi xóa sản phẩm:', error);
          alert('Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại sau.');
        }
      );
    }
  }

  updatePage() {
    const start = (this.page - 1) * 10;
    const end = start + 10;
    this.products = this.listProduct.slice(start, end);

    if (this.products.length === 0 && this.page > 1) {
      this.page--;
      this.updatePage();
    }
  }

  filter() {
    if (this.filterValue) {
      this.page = 1;
      this.listProduct = this.allProducts.filter(p =>
        p.productName.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    } else {
      this.listProduct = this.allProducts;
    }
    this.updatePage();
  }
  viewProduct(id: number) {
    this.router.navigate(['/client/products', id]); // <- Ensure to use absolute path here
  }
}
