import { Component, OnInit } from '@angular/core';
import { NewPageService } from '@core/newPage.service';
import { AlertService } from '@core/alert.service';

@Component({
  selector: 'app-some-random-page',
  templateUrl: './some-random-page.component.html',
  styleUrls: ['./some-random-page.component.css'],
})
export class SomeRandomPageComponent implements OnInit {
  constructor(private newPageService: NewPageService, private alertSvc: AlertService) { }

  ngOnInit() {
    this.newPageService.setNewPage('Some New Page!!');

    this.alertSvc.createAlert({
      alertClass: 'alert-success',
      alertMessage: 'Wow this is cool stuff!!!',
      alertLink: "",
      alertLinkText: ""
    });
  }
}
