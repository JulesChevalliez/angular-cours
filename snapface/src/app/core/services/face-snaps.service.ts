import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {
    constructor(private http: HttpClient){}

    getAllFaceSnaps(): Observable<FaceSnap[]> {
        return this.http.get<FaceSnap[]>("http://localhost:3000/facesnaps");
    }

    getFaceSnapById(id: number): Observable<FaceSnap> {
        const facesnap = this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${id}`)
        if(facesnap){
            return facesnap;
        }else{
            throw new Error("Facesnap not found !");
        }
    }


    snapFaceSnapById(id: number, snapType: "snap" | "unsnap"): Observable<FaceSnap> {
    
        return this.getFaceSnapById(id).pipe(
            map(facesnap => ({
                ...facesnap,
                snaps: facesnap.snaps + (snapType === "snap" ? 1 : -1)
            })),
            switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${id}`, updatedFaceSnap))
        )
    }

    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
        return this.getAllFaceSnaps().pipe(
            map(facesnap => [...facesnap].sort((a,b) => a.id - b.id)),
            map(sortedSnaps => sortedSnaps[sortedSnaps.length - 1]),
            map(prevSnap => ({
                ...formValue,
                snaps: 0,
                createdDate: new Date(),
                id: prevSnap.id + 1
            })),
            switchMap(newFaceSnap => this.http.post<FaceSnap>("http://localhost:3000/facesnaps", newFaceSnap))
        )
    }
}