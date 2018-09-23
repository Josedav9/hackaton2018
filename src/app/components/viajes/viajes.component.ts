import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'
import { trip } from '../../interfaces/trips.interface'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  viajes

  constructor( public _fs:FirebaseService, public router:Router ) { }

  ngOnInit() {
    this.viajes = this._fs.viajesUsuario().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as trip
        const id = a.payload.doc.id
        return { id, ...data }
      }))
    )
  }

  navegar( viaje:trip ){
    this.router.navigate([`viaje/${viaje.id}`])
  }

}
