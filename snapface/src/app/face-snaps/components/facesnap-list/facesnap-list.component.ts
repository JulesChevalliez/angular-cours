import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-facesnap-list',
  templateUrl: './facesnap-list.component.html',
  styleUrls: ['./facesnap-list.component.scss']
})
export class FacesnapListComponent implements OnInit, OnDestroy {

  facesnaps!: FaceSnap[];
  private destroy$! : Subject<boolean>;
  facesnaps$!: Observable<FaceSnap[]>;

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    //this.facesnaps = this.faceSnapsService.getAllFaceSnaps();
    this.facesnaps$ = this.faceSnapsService.getAllFaceSnaps();
    this.destroy$ = new Subject<boolean>();

    interval(1000).pipe(
      takeUntil(this.destroy$),
      tap(console.log)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }

}
