import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userDetail:any

  constructor( private service:AuthService, private router:Router){}

  ngOnInit(): void {
    const user = localStorage.getItem("user_id")
    this.service.userDetails(user).subscribe((res)=>{
      this.userDetail = res.data;
      console.log(this.userDetail)
    },)
  }

  logout() {
    localStorage.removeItem("user_id");
    this.service.isLoggedIn$.next(false);
    this.router.navigate([''])
  }
}
