import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoint } from 'src/app/features/admin/constants/api-route.constants';
import { IMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  public sendMessage(messageInfo: IMessage): Observable<any> {
    return this.http.post(endPoint.sendMessage, messageInfo);
  }
}
