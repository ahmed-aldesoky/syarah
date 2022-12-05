import { Component, OnInit, ɵNG_ELEMENT_ID } from '@angular/core';
import { Car, CarResponse } from 'src/app/data/models/cars';
import { Route, Router } from '@angular/router';
import { CarService } from 'src/app/data/service/cars.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cars:Car[]=[]

  constructor( private carService:CarService, private router:Router) { }

  ngOnInit(): void {
    // this.carService.getCars().subscribe((cars)=>(
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
    //     year:car.attributes.year,
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

  toCar(car:Car){
    this.router.navigate(["/product",car.id]);
  }



}
