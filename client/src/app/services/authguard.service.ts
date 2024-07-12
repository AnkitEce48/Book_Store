import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthguardService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("user_id") !== null;
  }
}
