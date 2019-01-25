
import { Routes } from "@angular/router";
import { LoggedInGuard } from "./security/loggedin.guard";
import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./security/login/login.component";

export const ROUTES: Routes = [
    {path:'', component: HomeComponent},
    {path:'login/:to', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path:'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]},
    {path:'restaurants', component: RestaurantsComponent},
    {path:'order', loadChildren: './order/order.module#OrderModule',
     canLoad: [LoggedInGuard],
     canActivate: [LoggedInGuard]
    },
    {path:'order-summary', component: OrderSummaryComponent},
    //só carrega o modulo about quando a rota for acionada (lazy loading)
    {path:'about', loadChildren: './about/about.module#AboutModule'},
    {path:'**', component: NotFoundComponent},
]