import { Component, OnInit } from '@angular/core';
import { ApicallerService } from './apicaller.service';
import { NewPageService } from '@core/newPage.service';

@Component({
  selector: 'app-apicaller',
  templateUrl: './apicaller.component.html',
  styleUrls: ['./apicaller.component.css'],
})
export class ApicallerComponent implements OnInit {  
  idParameter: number; 
  parameterlessResults: string; 
  resultFromParam: string;

  constructor(private newPageService: NewPageService, private apiService: ApicallerService) { }

  ngOnInit() {
    this.newPageService.setNewPage('API Calling Page');    
  };

  callValuesApi() {
    this.parameterlessResults = "";
    this.apiService.getThingies().subscribe((result: any) => {
      this.parameterlessResults = JSON.stringify(result);
    })
  }

  callValuesApiWithParam() {
    this.resultFromParam = "";
    this.apiService.getSingleThingy(this.idParameter).subscribe((result) => {
      this.resultFromParam = JSON.stringify(result);
    })
  }
}
