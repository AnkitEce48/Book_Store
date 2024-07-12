import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "src/app/services/book.service";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  books: any;
  totalPrice: any;

  constructor(
    private arouter: ActivatedRoute,
    private service: BookService,
    private router: Router,
    private aservice: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let email = localStorage.getItem("email");
    this.aservice.getCart(email).subscribe({
      next: (res) => {
        this.books = res;
        this.totalPrice = this.books.reduce(
          (acc: any, book: any) => parseInt(acc) + parseInt(book.price),
          0
        );
      },
    });
  }

  buyOutForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required],
    address: ["", Validators.required],
    city: ["", Validators.required],
    pin: ["", Validators.required],
    state: ["", Validators.required],
    paymentmethod: [""],
  });

  onSubmit() {
    const user = localStorage.getItem("user_id");
    let addressDetails = this.buyOutForm.value;
    const email = localStorage.getItem("email");
    this.aservice.deleteCart(email).subscribe({
      next: (res) => {},
    });
    let orderDetails = {
      ...addressDetails,
      userId: user,
      books: this.books,
      totalprice: this.totalPrice,
    };
    console.log(orderDetails);
    this.service.orderService(orderDetails).subscribe((res) => {
      alert(res.message);
      console.log(orderDetails);
      this.buyOutForm.reset();
      this.router.navigate(["orders"]);
    });
  }
}
