import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/data/service/authentication.service';
import { StorageService } from 'src/app/data/service/storage.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
private loginSub: Subscription | undefined;

  constructor(private fb:FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private ss: StorageService,
   private toast: NgToastService
   ) { }

  loginForm= this.fb.group({
    email:['',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],

    // phone:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
    // pass:['',[Validators.required,Validators.pattern('^[a-zA-Z\s]+$')]], 
    pass:['',[Validators.required]],

  })
  // get phone(){
  //   return this.loginForm.get('phone')
  // }
  get email(){
    return this.loginForm.get('email')
  }
  get pass(){
    return this.loginForm.get('pass')
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
  ngOnInit(): void {
  }

  login() {
    const credentials = this.loginForm.value;

    this.loginSub = this.auth.login(
      // credentials.phone,
      credentials.email,
      credentials.pass
    ).subscribe(
      resp => {
        this.toast.success({detail:"اهلا بك في سيارة  vip ", summary:"تم تسجيل الدخول بنجاح", duration:5000});

        this.loginForm.reset();

        this.auth.persistUser(resp);


        const attemptedRoute = this.ss.getItem('attemptedRoute');

        this.ss.removeItem('attemptedRoute');

        this.router.navigateByUrl(attemptedRoute || '/')
      },
      () => {
        this.toast.error({detail:"خطأ في تسجيل الدخول", summary:"البريد الالكنروني او الرقم السري خاطئ", duration:5000});
       
        
      }
    );
  }

}