import { UserService } from 'src/app/services/user.service';
import { Component, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  // private offCanvasService: inject(NgbOffCanvas);

  constructor(
    private onCanvasService: NgbOffcanvas,
    private menuService: MenuService,
    private userService: UserService,
    private route: Router
  ) {}

  open(content: TemplateRef<any>) {
    this.onCanvasService.open(content);
  }
  getMenu() {
    return this.menuService.menus;
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
        this.onCanvasService.dismiss('close');
        Swal.fire({
          title: 'Thank You!',
          text: 'Kamu telah logout.',
          icon: 'success',
          confirmButtonColor: '#212529',
        });
        setTimeout(() => {
          this.route.navigate(['']);
        }, 200);
      }
    });
  }
}
