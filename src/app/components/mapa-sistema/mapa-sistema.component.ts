import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'
import { station } from '../../interfaces/station.interface'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-mapa-sistema',
  templateUrl: './mapa-sistema.component.html',
  styleUrls: ['./mapa-sistema.component.css']
})
export class MapaSistemaComponent implements OnInit {
  lat: number = 4.6412685
  lng: number = -74.0817906
  zoom: number = 13;
  viaje: boolean = false
  estaciones_snap: Observable<station[]>

  estaciones: any

  constructor(public _fs: FirebaseService) { }

  ngOnInit() {
    this.estaciones = this._fs.obtenerEstaciones().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as station
        const id = a.payload.doc.id
        return { id, ...data }
      }))
    )
  }

  crearMarcador(event) {
    let estacion: station = {
      lat: event.coords.lat,
      lon: event.coords.lng,
      nombre: "Estacion",
      tipo: "normal",
      espacios: 3,
      bicicletas: []
    }
    console.log(event)
    this._fs.crearEstacion(estacion).then(
      res => console.log(res)
    ).catch(err => console.log(err))
  }

  tengoViaje() {
    if (localStorage.getItem('usuario')) {
      let usuario: User = JSON.parse(localStorage.getItem('usuario'));
      if (usuario.prestada) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }


  tomarBicicleta(estacion) {
    let id_bicicleta = estacion.bicicletas.pop()
    this._fs.tomarPrestadaBicicleta(id_bicicleta, estacion)
  }

  regresarBicicleta(estacion) {
    this._fs.regresarBicicleta( estacion )
  }

}
