import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export default class RegisterComponent implements OnInit {
  constructor(
    private service: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", Validators.required],
        userName: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        phone: ["", Validators.required],
      },
      {
        validator: this.confirmPasswordValidator("password", "confirmPassword"),
      }
    );
  }

  register() {
    this.service.registerService(this.registerForm.value).subscribe({
      next: (res) => {
        alert(res);
        this.router.navigate(["/login"]);
        this.registerForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  confirmPasswordValidator = (
    controlName: string,
    controlNameToMatch: string
  ) => {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let controlToMatch = formGroup.controls[controlNameToMatch];
      if (
        controlToMatch.errors &&
        !controlToMatch.errors["confirmPasswordValidator"]
      ) {
        return;
      }
      if (control.value !== controlToMatch.value) {
        controlToMatch.setErrors({ confirmPasswordValidator: true });
      } else {
        controlToMatch.setErrors(null);
      }
    };
  };
}
