import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders:any = null;
  anyorder:boolean = false

  constructor(private service:BookService){}

  ngOnInit(): void {
    this.getorder()
  }

  cancelOrder(id:any){
    this.service.cancelorder(id).subscribe({
      next: (res) =>{
        this.getorder()
        console.log(id)
      }
    })
  }
  
  getorder(){
    let userId = localStorage.getItem("user_id")
    this.service.getorders(userId).subscribe({
      next: (res)=> {
        this.orders = res
        this.noorders()
      }
    })
  }


  noorders(){
    if(this.orders.length == 0){
      this.anyorder = false
    }
    else{
      this.anyorder = true
    }
    console.log(this.anyorder)
  }

  button(status:any){
    if(status=="Cancelled"){
      return false;
    }
    else{
      return true;
    }
  }

}
