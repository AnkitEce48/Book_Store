import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {

  constructor(private router:Router, private authService:AuthService, private fb:FormBuilder){}

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    }
    );
  }

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert("Login is Success!");
        localStorage.setItem("user_id", res.data._id);
        localStorage.setItem("email", res.data.email)
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['home']);
        this.loginForm.reset();

      },
      error:(err)=>{
        console.log(err);
        alert(err.error)
      }
    })
  }
}
