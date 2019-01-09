    {path:'about', loadChildren: './about/about.module#AboutModule'},
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const ROUTES: Routes = [
    {path:'', component: HomeComponent},
    //só carrega o modulo about quando a rota for acionada (lazy loading)
    {path:'about', loadChildren: './about/about.module#AboutModule'},
    {path:'order', loadChildren: './order/order.module#OrderModule'},
    {path:'order-summary', component: OrderSummaryComponent},
    {path:'restaurants', component: RestaurantsComponent},
    {
        path:'restaurants/:id', 
        component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]
    },
    {path:'**', component: NotFoundComponent},
]