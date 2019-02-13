import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantsService } from 'app/restaurants/restaurants.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  public reviews: Observable<any>

  constructor(
    private restaurantsService: RestaurantsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.reviews = this.restaurantsService.reviewsOfRestaurant(
      this.activatedRoute.parent.snapshot.params['id']
    )
  }

}
