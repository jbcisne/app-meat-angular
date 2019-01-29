import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OrderComponent } from "./order.component";

export class LeaveOrderGuard implements CanDeactivate<OrderComponent>
{
  canDeactivate(
    component: OrderComponent,
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {
    if (!component.isOrderCompleted()) {
      return window.confirm('Deseja realmente desistir da compra?')
    } else {
      return true
    }
  }
}