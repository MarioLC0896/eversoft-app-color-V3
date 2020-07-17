import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'eversoft-app';
  /*colors: Observable<any[]>;
  constructor(db: AngularFirestore){
    this.colors = db.collection('colors').valueChanges();
  }*/
  constructor(public authService: AuthService){
    this.authService.initAuthListener();
  }

}
