import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/data/models/cars';
import { CarService } from 'src/app/data/service/cars.service';
import { Route, Router } from '@angular/router';
import { SearchValue, SearchValueResponse } from 'src/app/data/models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  cars:Car[]=[]
  models:any[]=[]
  years:number[]=[]
  locations:string[]=[]

  searchValue:SearchValueResponse={
    maker:"",
    location:"",
    model:"",
    year: 0,
   
  }
  constructor(private carService:CarService, private router:Router) { }
  ngOnInit(): void {
  //    this.carService.getCars().subscribe((cars)=>(
  //   this.cars=cars.data.map((car)=>({
  //     id:car.id,
  //     name: car.attributes.name,
  //     maker:car.attributes.maker,
  //     location:car.attributes.location,
  //     description:car.attributes.description,
  //     videoLink:car.attributes.videoLink,
  //     img1:car.attributes.img1,
  //     img2:car.attributes.img2,
  //     img3:car.attributes.img3,
  //     img4:car.attributes.img4,
  //     img5:car.attributes.img5,
  //     img6:car.attributes.img6,
  //     img7:car.attributes.img7,
  //     img8:car.attributes.img8,
  //     img9:car.attributes.img9,
  //     model:car.attributes.model,
  //     year: car.attributes.year,
  //     mileage:car.attributes.mileage,
  //     Transmission:car.attributes.Transmission,
  //     Cylinders:car.attributes.Cylinders,
  //     type:car.attributes.type,
  //     Doors:car.attributes.Doors,
  //     Color:car.attributes.Color,
  //     Fuel:car.attributes.Fuel,
  //   }))
  // ))
  this.carService.getCars().subscribe((car)=>(
    this.cars=car.map((car)=>({
      id:car.id,
      name: car.name,
      maker:car.maker,
      location:car.location,
      description:car.description,
      videoLink:car.videoLink,
      img1:car.img1,
      img2:car.img2,
      img3:car.img3,
      img4:car.img4,
      img5:car.img5,
      img6:car.img6,
      img7:car.img7,
      img8:car.img8,
      img9:car.img9,
      model:car.model,
      year: car.year,
      mileage:car.mileage,
      Transmission:car.Transmission,
      Cylinders:car.Cylinders,
      type:car.type,
      doors:car.doors,
      color:car.color,
      fuel:car.fuel,
      price:car.price,
    }))
    ))
  }

  selectbrand(selectedbrand:string){
    this.models=[]
    this.years=[]
    this.locations=[]
    this.searchValue.maker=selectedbrand
    for (const car of this.cars) {
      if (this.searchValue.maker===car.maker) {
        
        if (this.models.includes(car.model) ===false){
          this.models.push(car.model)
        }

        if (this.locations.includes(car.location) ===false){
          this.locations.push(car.location)
        }

        if (this.years.includes(car.year) ===false){
          this.years.push(car.year)
        }
      }
    }
    
  }
  selectmodel(model:string){
  this.searchValue.model=model
}
selectyear(year:any){
  this.searchValue.year=year
}
selectlocation(location:string){
this.searchValue.location=location
// this.router.navigate(["/product"],{queryParams:this.searchValue});


}
  toproduct(){
this.router.navigate(["/product"], {queryParams:{maker:this.searchValue.maker,location:this.searchValue.location,model:this.searchValue.model,year:this.searchValue.year} });

    
  }

}
