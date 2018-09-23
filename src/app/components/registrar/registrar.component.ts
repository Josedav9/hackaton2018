import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseService } from '../../services/firebase.service'
import { User } from '../../interfaces/user.interface'

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  userCollection: AngularFirestoreCollection<User>
  email:string;
  password:string;
  usuario:User = {
    nombre:"",
    apellido:"",
    cedula:"",
    telefono: "",
    prestada: null
  };

  exito:string;
  sinExito:string;
  constructor(public db: AngularFirestore, public _fs: FirebaseService) {
    this.userCollection = this.db.collection('usuario')
  }

  registrar(){
    this._fs.crearUsuario( this.email, this.password ).then(
      resp => {
        this.userCollection.doc( resp.user.uid ).set( this.usuario ).then(
          resp => {
            if(resp == undefined){
              this.exito = "Se creo exitosamente"
            }
          }
        )
      }
    ).catch(
      err => {
        console.log("Falle")
        this.sinExito = "No se registro correctamente" + err;
      }
    );
  }



  ngOnInit() {
  }

}
