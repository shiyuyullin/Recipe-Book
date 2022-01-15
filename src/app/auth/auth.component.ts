import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm){
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObservable: Observable<authResponseData>;
    if(this.isLoginMode){
      authObservable = this.authService.login(email, password);
    }
    else{
      authObservable = this.authService.signup(email, password);
    }
    authObservable.subscribe({
      next: resDate => {
        console.log(resDate);
        this.router.navigate(['/recipe']);
      },
      error: errorMessage => {
        this.error = errorMessage;
        console.log(errorMessage);
      }
    });
    authForm.reset();

  }

}
