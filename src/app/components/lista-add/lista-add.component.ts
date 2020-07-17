import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../services/conexion.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-lista-add',
  templateUrl: './lista-add.component.html',
  styleUrls: ['./lista-add.component.css']
})
export class ListaAddComponent implements OnInit {

  color:any = {
    hexadecimal: '',
    name: '',
    timestamp: firestore.Timestamp.now()
  }

  constructor(private servicio:ConexionService) { }

  ngOnInit(): void {
  }

  agregar(){
    this.color.timestamp = firestore.Timestamp.now();
    this.servicio.agregarColor(this.color);
    this.color.name = '';
    this.color.hexadecimal = '';
    this.color.tymestamp = '';
  }

}
