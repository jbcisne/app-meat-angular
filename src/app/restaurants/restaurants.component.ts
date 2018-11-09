import { Component, OnInit, Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  providers: [RestaurantsService]
})
export class RestaurantsComponent implements OnInit {

  public restaurants: Array<Restaurant>

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.restaurantsService.restaurants()
      .subscribe((restaurants: Array<Restaurant>) => this.restaurants = restaurants);
  }

}
