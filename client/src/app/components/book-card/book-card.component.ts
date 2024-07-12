import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthguardService } from 'src/app/services/authguard.service';
import LoginComponent from 'src/app/pages/login/login.component';


@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule,LoginComponent],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {

  constructor(private router:Router, private service:CartService, private authService:AuthguardService){}

  @Input({ required: true }) book!: Book;

  viewDetail(id:any){
    this.router.navigate(["/viewdetails/"+id])
  }

  addToCart(title:any,price:any,image:any){
   if(this.authService.isLoggedIn()){
    const email = localStorage.getItem("email")
    let bookData = {title:title,price:price,image:image,email:email}
    this.service.add(bookData).subscribe({
      next:(res)=>
      alert(`${bookData.title} is added to cart`)
    })
    console.log(this.authService.isLoggedIn())

    

  }
  else{
    alert("Please login to add to cart")
     this.router.navigate(["/login"])
  }

  }
  

}
