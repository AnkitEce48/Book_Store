import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  books:any
  totalPrice:number = 0;

  constructor(private service:CartService, private router:Router){}

  ngOnInit(): void {
    this.getCart();
  }


  toCheckOut(){
    this.router.navigate(["/checkout/"])
  }

  getCart(){
    let email = localStorage.getItem("email")
    this.service.getCart(email).subscribe({
      next: (res) => {
        this.books = res
        this.totalPrice = this.books.reduce((acc:any, book:any) => parseInt(acc) + parseInt(book.price), 0);
      },
    });
  }

  removeFromCart(title:any){
    const email = localStorage.getItem("email")
    this.service.removeFromCart(email,title).subscribe({
      next:(res) => {
        this.getCart()
      }
    })
  }
}
