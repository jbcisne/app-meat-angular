import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  public restaurant: Restaurant

  constructor(
    private activeRouter: ActivatedRoute,
    private restaurantsService: RestaurantsService
  ) { }

  ngOnInit() {
    let id = this.activeRouter.snapshot.params['id'];
    //this.activeRouter.params.subscribe((params: Params) => {
      this.restaurantsService.restaurantById(id)
        .subscribe((r: Restaurant) => this.restaurant = r)
    //})
  }

}
