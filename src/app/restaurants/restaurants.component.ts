import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearchBar', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px" 
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px" ,
        "margin-top": "20px"
      })),
      transition('*=>*', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  public searchBarState = 'hidden'
  public restaurants: Array<Restaurant>
  public searchForm: FormGroup
  public searchControl: FormControl

  constructor(
    private restaurantsService: RestaurantsService,
    private fb: FormBuilder
  ) { 
  }

  ngOnInit() {
    this.searchControl = this.fb.control('')

    /* controle de digitação na barra de pesquisa */
    this.searchControl.valueChanges
      .switchMap(searchTerm => 
        this.restaurantsService.restaurants(searchTerm)
      )
      .subscribe((restaurants: Array<Restaurant>) => this.restaurants = restaurants)

    /** criação do formulário */
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    /** busca dos restaurantes a serem exibidos na tela */
    this.restaurantsService.restaurants()
      .subscribe((restaurants: Array<Restaurant>) => this.restaurants = restaurants);
  }

  public toggleSearch(): void {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible':'hidden'
  }
}
