import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhonePipe } from './pipes/phone.pipe';


@NgModule({
  declarations: [
    PhonePipe
  ],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    PhonePipe
  ]
})
export class SharedModule { }
