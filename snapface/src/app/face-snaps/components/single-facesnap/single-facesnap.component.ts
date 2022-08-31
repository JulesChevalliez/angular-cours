import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-single-facesnap',
  templateUrl: './single-facesnap.component.html',
  styleUrls: ['./single-facesnap.component.scss']
})
export class SingleFacesnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;
  facesnap$!: Observable<FaceSnap>;
  snapped!: boolean;
  buttonTxt!: string;
  paramId!: number;

  constructor(private faceSnapService: FaceSnapsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.snapped = false;
    this.buttonTxt = "Oh snap !";
    this.paramId = +this.route.snapshot.params["id"];
    this.facesnap$ = this.faceSnapService.getFaceSnapById(this.paramId)
  }

  onAddSnap(id: number) {
    if(!this.snapped){
      this.facesnap$ = this.faceSnapService.snapFaceSnapById(id, "snap").pipe(
        tap(() => {
          this.buttonTxt = "Oops unsnap !";
          this.snapped = true;
        })
      )
    }else{
      this.facesnap$ = this.faceSnapService.snapFaceSnapById(id, "unsnap").pipe(
        tap(() => {
            this.buttonTxt = 'Oh Snap!';
            this.snapped = false;
        })
      );      
    }
  }
}
