import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe( fuser => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    })
  }

  crearUsuario(nombre: string, email: string, password: string, timestamp: firestore.Timestamp){
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const newUser = new Usuario( user.uid, nombre, user.email, firestore.Timestamp.now() );
      return this.firestore.doc(`usuario/${user.uid}`).set({ ...newUser});
    });
  }

  loginUsuario(email: string, password: string){
    return  firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout(){
    return firebase.auth().signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(map(fbUser => fbUser != null));
  }
}
