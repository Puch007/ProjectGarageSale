import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import {HttpService} from '../../shared-service/http.service';
export interface IBike {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  myName = '';
  cars: [ ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
   await this.refresh();

  }

  async refresh() {
this.cars = await this.getCars('car');

  }

async getCars(path: string) {
  const resp = await this.http.get(path);
  return resp;
}

async createCar() {
  const car = {
make: null,
model: null,
year: null,
description: null,
price: null,
quantity: null
  };
const resp = await this.http.post('car', car);
console.log('fromcreat', resp);
if (resp) {
  this.cars.unshift();
} else {
  this.toastService.showToast('danger', 3000, 'Create Item no good');

}
return resp;
}

async updateCar(car: any) {
const resp = await this.http.Put(`car/id/${car.id}`, car);
if (resp) {
  this.toastService.showToast('success', 3000, 'Item has been Saved');
}
return resp;

}

async removeCar(car: any, index: number) {
  // this.cars.splice(index, 1);
  const resp = await this.http.delete(`car/id/${car.id}`);
  if (resp) {
    this.refresh();
    this.toastService.showToast('danger', 3000, 'Item has been Deleted');

  }
}

}
