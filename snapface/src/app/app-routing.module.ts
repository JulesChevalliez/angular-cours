import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacesnapListComponent } from './face-snaps/components/facesnap-list/facesnap-list.component';
import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
import { NewSnapfaceComponent } from './face-snaps/components/new-snapface/new-snapface.component';
import { SingleFacesnapComponent } from './face-snaps/components/single-facesnap/single-facesnap.component'; 

const routes: Routes = [
  { path: 'facesnaps', loadChildren: () => import('./face-snaps/face-snaps.module').then(m => m.FaceSnapsModule) },
  { path: '', component: LandingPageComponent }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class AppRoutingModule {}