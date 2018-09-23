import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'
import { AngularFirestore } from '@angular/fire/firestore'
import { User } from '../../interfaces/user.interface'
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password = "";
  correo = "";
  cargando = false;
  sinExito:string


  constructor( public _fs:FirebaseService, private router:Router, public db:AngularFirestore  ) { }

  login(){
    this.cargando = true
    console.log(this.password, this.correo)
    this._fs.login( this.correo, this.password ).then(res =>{
      this.db.doc<User>(`usuario/${ res.user.uid }`).valueChanges().subscribe( user =>{
        let usuario:User = user;
        usuario.id = res.user.uid;
        localStorage.setItem('usuario', JSON.stringify( usuario ));
        this.router.navigate(['home'])
        this.cargando = true
      })
    }).catch(err =>{
      console.log(err)
      this.sinExito = err;
    })
  }

  registrarse(){
    this.router.navigate(['registro'])
  }



  ngOnInit() {
  }

}
