import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  isLoggedIn: boolean = false;
  showUserDropdown: boolean = false;

  toggleMenu(): void {
    const menuContent = document.getElementById("menuContent");
    menuContent?.classList.toggle("hidden");
  }
  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    this.authService.isLoggedIn$.next(false);
    this.showUserDropdown = false;
  }
}
