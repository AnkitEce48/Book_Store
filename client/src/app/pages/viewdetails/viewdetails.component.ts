import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viewdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent {

    id:any
    book:any

    constructor(private arouter:ActivatedRoute , private router:Router, private authService:AuthService, private service:BookService, private aservice:CartService){}

  ngOnInit(): void {
    this.id = this.arouter.snapshot.paramMap.get("id")
    this.service.getbook(this.id).subscribe((res)=>{
      this.book = res
    })
  }

  
  addToCart(title:any,price:any,image:any){
    if(this.authService.isLoggedIn()){
    const email = localStorage.getItem("email")
    let bookData = {title:title,price:price,image:image,email:email}
    this.aservice.add(bookData).subscribe({
      next:(res)=>
        alert(res.message)
    })
  } 
  else{
    alert("Please Login to add to cart")
    this.router.navigate(["/login"])
  }
  }
}
