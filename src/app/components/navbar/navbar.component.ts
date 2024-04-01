import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/services/loading.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private userService: UserService,
    private route: Router,
    private loadingService: LoadingService,
    private menuService: MenuService
  ) {}

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  logout() {
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: 'Kamu akan logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#212529',
      cancelButtonColor: '#ffc107',
      confirmButtonText: 'Yakin!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();

        Swal.fire({
          title: 'Thank You!',
          text: 'Kamu telah logout.',
          icon: 'success',
          confirmButtonColor: '#212529',
        });
        setTimeout(() => {
          this.route.navigate(['']);
        }, 150);
      }
    });
  }

  isLoading() {
    return this.loadingService.isLoading();
  }

  getMenu() {
    return this.menuService.menus;
  }
}
