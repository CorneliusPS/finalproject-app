import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { main } from '@popperjs/core';
import { catchError, throwError } from 'rxjs';
import { IError } from 'src/app/interfaces/i-error';
import { IDataResponse, ISignin } from 'src/app/interfaces/i-signin';
import { Barang } from 'src/app/models/barang';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  user: ISignin;
  error: IError;

  constructor(private userService: UserService, private router: Router) {
    this.user = {
      username: '',
      password: '',
    };

    this.error = {
      detail: '',
    };
  }

  onSignIn() {
    this.userService
      .signIn(this.user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.error.detail = error.error.detail;
          Swal.fire({
            title: 'Error!',
            text: 'Username atau password salah',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          return throwError(() => new Error(error.error.detail));
        })
      )
      .subscribe((response: IDataResponse) => {
        this.userService.setAuthentication(response.data);
        Swal.fire({
          title: 'Success!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        setTimeout(() => {
          this.router.navigate(['main/barang']);
        }, 200);
      });
  }
}
