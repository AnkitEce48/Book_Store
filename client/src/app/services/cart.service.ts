import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}

  add(bookData: any) {
    console.log(bookData);
    return this.http.post<any>(`http://localhost:5000/api/cart`, bookData);
  }

  removeFromCart(email: any, title: any) {
    return this.http.delete<any>(
      `http://localhost:5000/api/cart/removefromcart/${email}/${title}`
    );
  }

  getCart(email: any) {
    return this.http.get<any>(
      `http://localhost:5000/api/cart/getcart/${email}`
    );
  }

  deleteCart(email: any) {
    return this.http.delete<any>(
      `http://localhost:5000/api/cart/deletecart/${email}`
    );
  }
}
