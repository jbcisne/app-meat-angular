import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MEAT_API } from "app/app.api";
import { ErrorHandler } from "app/app.error-handler";
import { Restaurant } from "./restaurant/restaurant.model";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.mode";

@Injectable()
export class RestaurantsService {
    constructor(private http: Http){}

    public restaurants(): Observable<Array<Restaurant>> {
        return this.http.get(`${MEAT_API}/restaurants`)
            .map(resposta => resposta.json())
            .catch(ErrorHandler.handlerError)
    }

    public restaurantById(id: string): Observable<Restaurant> {
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
            .map(resposta => resposta.json())
            .catch(ErrorHandler.handlerError)
    }

    public reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
            .map(resposta => resposta.json())
            .catch(ErrorHandler.handlerError)
    }

    public menuOfrestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
            .map(resposta => resposta.json())
            .catch(ErrorHandler.handlerError)
    } 
}