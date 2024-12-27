import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private socket: Socket) {}

  getNewOrderNotifications() {
    console.log(this.socket.fromEvent('newOrder'));
    return this.socket.fromEvent('newOrder');
  }

  getMessage() {
    // return this.socket.fromEvent('newOrder');
  }
}
