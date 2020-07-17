import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

export interface Color { 
  name: string;
  hexadecimal: string;
  timestamp: firestore.Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private colorsCollection: AngularFirestoreCollection<Color>;
  color: Observable<Color[]>;
  private colorDoc: AngularFirestoreDocument<Color>;
  constructor(private afs: AngularFirestore) {
    this.colorsCollection = afs.collection<Color>('colors');
    this.color = this.colorsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Color;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  listaColor(){
    return this.color;
  }

  newcolor: any;

  agregarColor(color: Color) {
    // this.newcolor = color;
    // this.newcolor.timestamp = firestore.Timestamp.now();
    // console.log(this.newcolor);
    this.colorsCollection.add(color);
  }

  eliminarColor(color){
    this.colorDoc = this.afs.doc<Color>(`colors/${color.id}`);
    this.colorDoc.delete();
    console.log('Se llego al servicio');
  }

  editarColor(color){
    this.colorDoc = this.afs.doc<Color>(`colors/${color.id}`);
    this.colorDoc.update(color);
  }
}
