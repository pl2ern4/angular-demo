import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../service/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  dishes:Dish[] = DISHES;
  selectedDish:Dish;
  constructor(private dishService:DishService) { }

  ngOnInit() {
    this.dishes = this.dishService.getDish();
  }

  onSelect(dish:Dish){
    this.selectedDish = dish;
  }

}
