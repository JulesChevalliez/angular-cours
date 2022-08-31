import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-new-snapface',
  templateUrl: './new-snapface.component.html',
  styleUrls: ['./new-snapface.component.scss']
})
export class NewSnapfaceComponent implements OnInit {

  snapForm! : FormGroup;
  faceSnapePreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  constructor(private formbuilder: FormBuilder, private faceSnapService: FaceSnapsService, private router: Router) { }

  ngOnInit(): void {

    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.snapForm = this.formbuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null]
    }, {
      updateOn: 'blur'
    });
    
    this.faceSnapePreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createDate: new Date(),
        id:0,
        snaps: 0,
      }))
    )
  }

  onSubmitForm(): void {
    this.faceSnapService.addFaceSnap(this.snapForm.value).pipe(
      tap(() => {
        this.router.navigateByUrl("facesnaps");
      })
    ).subscribe();
  }

}
