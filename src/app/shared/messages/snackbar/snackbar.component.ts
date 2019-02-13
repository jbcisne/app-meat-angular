import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from '../notification.service';

import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({opacity:0, bottom: 0})),
      state('visible', style({opacity:1, bottom: '30px'})),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!'

  snackVisibility = 'hidden'

  constructor(private notification: NotificationService) { }

  ngOnInit() {
    this.notification.notifier
    //antes do subscribe, intercepta a mensagem e faz a configuração
      .pipe(
        tap(message => {
          this.message = message;
          this.snackVisibility = 'visible'
        }),
        //encadeia outro observabel do tipo time. faz o unsubscribe de timer já existente e faz um novo subscribe
        switchMap(message=> timer(3000))
      )
    //agora sim se escreve no objservable do notifier apartir do novo objservable time do switchMap
    .subscribe(timer=>this.snackVisibility='hidden')
  }

}
