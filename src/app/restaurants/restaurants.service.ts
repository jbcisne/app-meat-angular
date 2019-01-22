import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MEAT_API } from "app/app.api";
import { ErrorHandler } from "app/app.error-handler";
import { Restaurant } from "./restaurant/restaurant.model";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.mode";


@Injectable()
export class RestaurantsService {
    constructor(private http: HttpClient){}

    public restaurants(searchTerm?: string): Observable<Restaurant[]> {
        let params: HttpParams = undefined
        if(searchTerm){
            params = new HttpParams().set('q', searchTerm)
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
    }

    public restaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    public reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    public menuOfrestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
    } 
}