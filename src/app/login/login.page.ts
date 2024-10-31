import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCard, IonItem, IonLabel, IonInput, IonButton, IonSkeletonText } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { ILogin } from '../Models/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonButton, IonInput, IonLabel, IonItem, IonCard, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class LoginPage {

  loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    const credentials: ILogin = this.loginFormGroup.value

    this.loginService.login(credentials).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/tabs'])
    }, (err) => {
      console.log( err)
    })
  }

  register() {
    const credentials: ILogin = this.loginFormGroup.value
    this.loginService.register(credentials).subscribe((res) => {
      console.log(res)
    }, (err) => {
      console.log( err)
    })
  }


}
