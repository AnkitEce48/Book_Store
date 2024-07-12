import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<Response<Book[]>>("http://localhost:5000/api/book/");
    console.log(this.getBooks);
  }

  getbook(id: any) {
    return this.http.get<any>(`http://localhost:5000/api/book/${id}`);
  }

  orderService(orderDetails: any) {
    console.log(orderDetails);
    return this.http.post<any>(
      `http://localhost:5000/api/order/create`,
      orderDetails
    );
  }

  getorders(userId: any) {
    return this.http.get<any>(
      `http://localhost:5000/api/order/getorder/${userId}`
    );
  }

  cancelorder(id: any) {
    return this.http.put<any>(
      `http://localhost:5000/api/order/cancelorder/${id}`,
      id
    );
  }
}

export type Book = {
  _id: string;
  title: string;
  price: string;
  image: string;
  author: string;
  description: string;
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};
