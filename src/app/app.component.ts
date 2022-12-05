import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vip';
  currentlanguage!:string;
  constructor(@Inject(DOCUMENT)private document: Document,
    public translate:TranslateService ) { 
    this.currentlanguage=localStorage.getItem('currentlanguage')||'en';
    this.translate.use(this.currentlanguage)
  }


  changelanguage(lang:string){
    this.translate.use(lang);
    localStorage.setItem('currentlanguage',lang);
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    this.changeCssFile(lang);

  }


  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName("head")[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById("langCss") as HTMLLinkElement;
    let bundleName = lang === "ar" ?       "arabicStyle.css":"englishStyle.css";
    if (existingLink) {
       existingLink.href = bundleName;
    } else {
       let newLink = this.document.createElement("link");
       newLink.rel = "stylesheet";
       newLink.type = "text/css";
       newLink.id = "langCss";
       newLink.href = bundleName;
       headTag.appendChild(newLink);
    }
    }
  
}


