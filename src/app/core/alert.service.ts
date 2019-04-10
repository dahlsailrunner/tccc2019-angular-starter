import { Injectable, EventEmitter } from '@angular/core';
import { AlertDetails } from '@models/alertDetails';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public setAlert$ = new EventEmitter<AlertDetails>(true);

  public createAlert(alertDeets: AlertDetails): void {
    this.setAlert$.emit(alertDeets);
  }

  public clearAlert(): void {
    this.setAlert$.emit(null);
  }
}
