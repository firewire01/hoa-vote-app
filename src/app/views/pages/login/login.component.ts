import { Component } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AuthService } from '../../../_service/auth.service';
import { StorageService } from '../../../_service/storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, 
      TextColorDirective, CardComponent, CardBodyComponent, InputGroupComponent,
      InputGroupTextDirective, IconDirective, ButtonDirective, RouterModule, 
      FormsModule, FormDirective, FormControlDirective, ReactiveFormsModule, CardComponent, 
      CardGroupComponent, CommonModule]
})
export class LoginComponent {

  loginForm =  this.formBuilder.group({
    username: '',
    password: ''
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: [];

  constructor(private authService: AuthService, private storageService: StorageService, 
    private router : Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    // console.log("yes");
    // const { username, password } = this.loginForm;
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log(data);
        console.log(this.storageService.getRoles());

        if(this.storageService.getRoles().includes('ADMIN')){
          console.log("here");
          this.router.navigate(['/admin-view']);
        }else{
          console.log("yes");
          this.router.navigate(['/voter-home']);
        }
        // this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
