import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;
  snapped!: boolean;
  buttonTxt!: string;

  constructor(private faceSnapService: FaceSnapsService, private router: Router) {}

  ngOnInit() {
    this.snapped = false;
    this.buttonTxt = "Oh snap !"
  }

  onClickViewFacesnap(){
    this.router.navigate(["facesnaps", this.faceSnap.id])
  }

}