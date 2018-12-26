import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { RestaurantComponent } from './restaurants/restaurant/restaurant.component'
import { RestaurantsComponent } from './restaurants/restaurants.component';

import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';

import { OrderSummaryComponent } from './order-summary/order-summary.component';

import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    //preloadingStrategy carregas os modulos lazy loading em background apos o carregamento do modulo root
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
