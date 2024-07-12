import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any) {
    return this.http.post<any>(
      `http://localhost:5000/api/auth/register`,
      registerObj
    );
  }

  loginService(loginObj: any) {
    return this.http.post<any>(
      `http://localhost:5000/api/auth/login`,
      loginObj
    );
  }

  userDetails(userId: any) {
    return this.http.get<any>(`http://localhost:5000/api/user/${userId}`);
  }

  isLoggedIn() {
    return !!localStorage.getItem("user_id");
  }
}
