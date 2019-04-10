import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ApicallerComponent } from './apicaller.component';

const routes : Routes = [
    { path: '', component: ApicallerComponent }
];

@NgModule({
    imports : [ RouterModule.forChild(routes) ],
    exports : [ RouterModule ]
})
export class ApicallerRoutingModule {
    static components = [ ApicallerComponent ];
}