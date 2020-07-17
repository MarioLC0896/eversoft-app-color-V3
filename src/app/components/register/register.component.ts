import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firestore } from 'firebase';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      timestamp : firestore.Timestamp.now()
    });
  }

  crearUsuario() {
    if(this.formGroup.invalid) {return;}

    const { nombre, correo, password, timestamp } = this.formGroup.value;
    this.authService.crearUsuario(nombre, correo, password, timestamp)
    .then(credenciales => {
      console.log(credenciales);
      this.router.navigate(['/']);
    })
    .catch(err => {Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: err.message
    })});
  }

}
