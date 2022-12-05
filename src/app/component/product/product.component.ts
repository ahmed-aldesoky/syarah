import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Car, CarResponse } from 'src/app/data/models/cars';
import { SearchValue, SearchValueResponse } from 'src/app/data/models/search';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { CarService } from 'src/app/data/service/cars.service';
import { SortPipe } from "../../shared/pipes/sort.pipe";

import {cloneDeep} from 'lodash';
import { filter } from 'rxjs/operators'
import { fromEvent } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
export interface logos{
  name: string,
  path: string
}[]
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  cars:Car[]=[]
  fakeCar:Car[]=[]
  x:Car[]=[]

  searchValue:SearchValueResponse={
    maker:" ",
    location:" ",
    model:" ",
    year: 0,
    // minPrice:0,
    // maxPrice:10000000,
    // state:"   ",
  }
  makers:any[]=["Mercedes-Benz","Lamborghini","Bentley","Porsche","bmw","dodg","Rolls Royce"]
  models:any[]=[]
  years:number[]=[]
  locations:string[]=[] 



  logo:logos[]=[
    {name:"bentley",path:"../../../assets/images/logo/bentley-logo.png"},
    {name:"mercedes",path:"../../../assets/images/logo/mercedes-.png"},
    {name:"bmw",path:"../../../assets/images/logo/bmw-brand-logo-0.png"},
    {name:"dodg",path: "../../../assets/images/logo/Dodge-logo-91321131BF-seeklogo.com.png"  },
    {name:"hummer",path:"../../../assets/images/logo/hummer-.png"},
    {name:"Cadillac",path:"../../../assets/images/logo/Cadillac-.png"},
    {name:"lamborghin",path:  "../../../assets/images/logo/lamborghin.png"},
    {name:"ferrari",path:"../../../assets/images/logo/ferrari-logo-png.png" },
    {name:"porsche",path:"../../../assets/images/logo/porsche-logo-2100x1100.png"},
    {name:"Volkswagen",path:"../../../assets/images/logo/Volkswagen.png"},
    {name:"Jeep",path:"../../../assets/images/logo/Jeep_logo.svg.png"},
    ]

  constructor(private activatedRouter:ActivatedRoute,
     private carService:CarService,
     private router:Router,
     private sortPipe: SortPipe) { }
  ngOnInit(): void {
        this.getcars()
        this.fakeCar=[...this.cars]

    
    }
  
    // filterByType (searchType:string,crit:any){
    
    //   switch (searchType) {
    //     case "All":
    //           this.getcars()
    //       break;
    //   case "byName":
    //     this.filter(crit)
    //   break
    //     default:
    //       break;
    //   }
    // }
    getcars(){
      return(
      this.carService.getCars().subscribe((car)=>(
        this.cars=car
        
        ))
        )

    }



    do(){
      for (const car of this.cars) {
        if (this.makers.includes(car.maker)==false) {
          this.makers.push(car.maker)
        }}
      }

  selectbrand(selectedbrand:string){
    this.getcars()
    this.models=[]
    this.years=[]
    this.locations=[]
    this.searchValue.maker=selectedbrand
    for (const car of this.cars) {
      if (this.searchValue.maker==car.maker) {

        if (this.models.includes(car.model) ===false){
          this.models.push(car.model)
          
        }
        if (this.locations.includes(car.location) ===false){
          this.locations.push(car.location)
        }
        if (this.years.includes(car.year) ===false){
          this.years.push(car.year)
        }}}
      }

  selectmodel(model:string,){
    this.searchValue.model=model

  }
  selectyear(year:any){
    this.searchValue.year=year
  }
  selectlocation(location:string){
  this.searchValue.location=location
  }

toCar(car:Car){
this.router.navigate(["/product",car.id]);
}

filterProject(){
  this.cars= this.filterCars()
  
    }
filterCars(){
    return this.cars.filter((product) => 
    { 
      return(
        product.maker.toLowerCase().indexOf( this.searchValue.maker?.toLowerCase())!==-1 &&
        product.model.toLowerCase().indexOf( this.searchValue.model?.toLowerCase())!==-1 &&
        product.location.toLowerCase().indexOf( this.searchValue.location?.toLowerCase())!==-1 &&
        product.year.toString().indexOf( this.searchValue.year?.toLowerCase())!==-1 
        )}
        )
       }


filter(value:string){
    
  let filterText=value
  this.getcars()
  setTimeout(() => {
  this.cars= this.filterProjectByLogo(filterText)
    
  }, 1000);
  
    }
  filterProjectByLogo(filterTerm: string ){

 return this.cars.filter((car) => 
 { 
   return car.maker.toLowerCase().indexOf( filterTerm?.toLowerCase())!==-1
 })
   
  
  }


    sortAtoZ(){
      this.cars= this.sortPipe.transform( this.cars, "asc", "name");

    }
    sortZtoA(){
      this.cars= this.sortPipe.transform( this.cars, "desc", "name");

    }

}
