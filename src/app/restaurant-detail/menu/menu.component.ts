import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { Observable } from 'rxjs/Observable';
import { MenuItem } from '../menu-item/menu-item.mode';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  public menu: Observable<MenuItem[]>

  constructor(
    private restaurantsService: RestaurantsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menu = this.restaurantsService
                    .menuOfrestaurant(this.activatedRoute.parent.snapshot.params['id'])
  }

  public addMenuItem(item: MenuItem) {
    console.log(item)
  }

}
