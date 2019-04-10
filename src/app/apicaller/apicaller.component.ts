import { Component, OnInit } from '@angular/core';
import { ApicallerService } from './apicaller.service';
import { NewPageService } from '@core/newPage.service';

@Component({
  selector: 'app-apicaller',
  templateUrl: './apicaller.component.html',
  styleUrls: ['./apicaller.component.css'],
})
export class ApicallerComponent implements OnInit {
  apiResults: string;

  constructor(private newPageService: NewPageService, private apiService: ApicallerService) { }

  ngOnInit() {
    this.newPageService.setNewPage('API Calling Page');

    this.apiService.getProducts().subscribe((data) => {
      this.apiResults = JSON.stringify(data);
    })
  }
}
