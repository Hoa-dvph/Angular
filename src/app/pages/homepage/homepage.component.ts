import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../entities/products';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, NgFor, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.ProductService.getAllProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }
}
