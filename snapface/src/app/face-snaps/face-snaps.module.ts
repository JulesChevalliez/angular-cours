import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaceSnapComponent } from './components/face-snap/face-snap.component';
import { FacesnapListComponent } from './components/facesnap-list/facesnap-list.component';
import { NewSnapfaceComponent } from './components/new-snapface/new-snapface.component';
import { SingleFacesnapComponent } from './components/single-facesnap/single-facesnap.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FaceSnapsRoutingModule } from './facesnaps-routing.module';



@NgModule({
  declarations: [
    FaceSnapComponent,
    FacesnapListComponent,
    NewSnapfaceComponent,
    SingleFacesnapComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FaceSnapsRoutingModule
  ],
  exports: [
    FaceSnapComponent,
    FacesnapListComponent,
    NewSnapfaceComponent,
    SingleFacesnapComponent
  ]
})
export class FaceSnapsModule { }
