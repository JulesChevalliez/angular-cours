import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacesnapListComponent } from './components/facesnap-list/facesnap-list.component';
import { NewSnapfaceComponent } from './components/new-snapface/new-snapface.component';
import { SingleFacesnapComponent } from './components/single-facesnap/single-facesnap.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: 'create', component: NewSnapfaceComponent, canActivate: [AuthGuard] },
  { path: ':id', component: SingleFacesnapComponent, canActivate: [AuthGuard] },
  { path: '', component: FacesnapListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceSnapsRoutingModule {}