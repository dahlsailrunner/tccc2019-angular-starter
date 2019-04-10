import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewPageService {
  public pageHasBeenSet$ = new EventEmitter<string>(true);

  public setNewPage(newPageName: string): void {
    this.pageHasBeenSet$.emit(newPageName);
  }
}
