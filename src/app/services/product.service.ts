import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProduct, ProductAdd } from '../entities/products';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiURL = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }
  generateProductId(): number {

    return Math.floor(Math.random() * 1000);
  }
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  getProductDetail(id: number) {
    return this.http.get<IProduct>(`${this.apiURL}/${id}`);
  }

  addProduct(data: ProductAdd) {
    return this.http.post(this.apiURL, data);
  }
  editProduct(product: ProductAdd, id: number) {
    return this.http.put<IProduct>(`${this.apiURL}/${id}`, product);
  }
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
