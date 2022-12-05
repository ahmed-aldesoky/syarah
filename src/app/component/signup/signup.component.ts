import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passValidation } from 'src/app/data/PasswordValidator';
import { AuthenticationService } from 'src/app/data/service/authentication.service';
import { StorageService } from 'src/app/data/service/storage.service';
// import { ToastService } from 'src/app/data/service/toast.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private registrationSub: Subscription | undefined;

  constructor(private fb:FormBuilder,
   private router:Router,
   private auth: AuthenticationService,
   private ss: StorageService,
  //  private toast: ToastService,
   private toast: NgToastService
     ) { }

  personalInfoForm= this.fb.group({
    name:['',[Validators.required,Validators.pattern('^[a-zA-Z\s]+$')]],
    email:['',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    phone:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    pass:['',[Validators.required]],
    confirmPass:['',[Validators.required]],

  },
  {validators:[passValidation]})

  get name(){
    return this.personalInfoForm.get('name')
  }
  get email(){
    return this.personalInfoForm.get('email')
  }
  get phone(){
    return this.personalInfoForm.get('phone')
  }
  get pass(){
    return this.personalInfoForm.get('pass')
  }
  get confirmPass(){
    return this.personalInfoForm.get('confirmPass')
  }
  

  ngOnDestroy(): void {
    if (this.registrationSub) {
      this.registrationSub.unsubscribe();
    }
  }

  get password() { return this.personalInfoForm.get('password'); }

  ngOnInit(): void {  
  }

  signup() {
    const user = this.personalInfoForm.value;

    this.registrationSub = this.auth.register(
      user.name,
      user.email,
      user.pass,
      user.phone,
    ).subscribe(
      resp => {
        this.toast.success({detail:"اهلا بك في سيارة  vip ", summary:"تم تسجيلك  بنجاح في سيارة vip", duration:5000});

        this.personalInfoForm.reset();

        this.auth.persistUser(resp);

        // this.toast.showSuccess('Successfully created account. Redirecting you to the quizzes.');

        const attemptedRoute = this.ss.getItem('attemptedRoute');

        this.ss.removeItem('attemptedRoute');

        this.router.navigateByUrl(attemptedRoute || '/')
      },
      () => {
        // this.toast.showDanger('There was a problem registering your account.');
        this.toast.error({detail:"خطأ في تسجيلك", summary:"برجاء التحقق من البيانات", duration:5000});
      }
    );
  }
  
}