import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../services/conexion.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  colors:any;

  editarColor:any = {
    name: '',
    hexadecimal: '#000000'
  }

  constructor(private conexion:ConexionService) {
    this.conexion.listaColor().subscribe(color => {
      this.colors = color;
      // console.log(this.colors)
    })
  }

  ngOnInit(): void {
  }

  eliminar(color){
    this.conexion.eliminarColor(color);
    console.log('Se presiono papelera');
  }

  editar(color){
    this.editarColor = color;
  }

  colorEditado(){
    this.conexion.editarColor(this.editarColor)
  }
  
}
