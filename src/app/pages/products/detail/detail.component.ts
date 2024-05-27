import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgFor, NgIf } from '@angular/common';
import { IProduct } from '../../../entities/products';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  product!: IProduct | undefined;

  ngOnInit() {
    this.route.params.subscribe((param) => {
      console.log(param['id']);
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          console.log(data);
          this.product = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }
}
