import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/data/service/toast.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/data/service/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentlanguage!:string;
  isLoggedIn = false;
  avatarInitial = '';
  username = '';
  authStatus!: Subscription;

  constructor(
    @Inject(DOCUMENT)private document: Document,
    public translate:TranslateService,
    private auth: AuthenticationService,
    private router: Router,
    private toast: ToastService ) { 
  this.currentlanguage=localStorage.getItem('currentlanguage')||'en';
  this.translate.use(this.currentlanguage)
}

  ngOnInit(): void {
    
    this.authStatus = this.auth.loggedInStatus$.subscribe(status => { 
      this.isLoggedIn = status;

      if (status) {
        this.username = this.auth.getPersistedUser().username;

        this.avatarInitial = this.username[0] || 'Q';
        
      }
    });



    const lang = localStorage.getItem("currentlanguage")
    lang && this.document.documentElement.setAttribute("lang",lang)
    lang && this.changelanguage(lang)

  }
  changelanguage(lang:string){
    this.translate.use(lang);
    localStorage.setItem('currentlanguage',lang);
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";

    let logo= this.document.getElementsByClassName("mylogo")[0]as HTMLHtmlElement
    lang === "ar" ?logo.setAttribute('src','"../../../assets/images/logoar.png'):logo.setAttribute('src','"../../../assets/images/logoen.png');

    lang==="ar"? this.document.body.classList.add("arabic"): this.document.body.classList.remove("arabic") 

  }


  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }

  logout() {
    this.auth.logout();

    this.toast.showSuccess('Successfully logged out.');

    this.router.navigateByUrl('/');
  }
}