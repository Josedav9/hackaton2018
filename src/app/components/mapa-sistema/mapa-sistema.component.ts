import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'
import { station } from '../../interfaces/station.interface'

@Component({
  selector: 'app-mapa-sistema',
  templateUrl: './mapa-sistema.component.html',
  styleUrls: ['./mapa-sistema.component.css']
})
export class MapaSistemaComponent implements OnInit {
  lat: number = 4.6412685
  lng: number = -74.0817906
  zoom: number = 13;

  estaciones: any

  constructor(public _fs: FirebaseService) { }

  ngOnInit() {
    this.estaciones = this._fs.obtenerEstaciones()
  }

  crearMarcador(event) {
    let estacion:station={
      lat: event.coords.lat,
      lon: event.coords.lng,
      nombre: "pepito",
      tipo: "normal",
      espacios: 3
    }
    console.log(event)
    this._fs.crearEstacion(estacion).then(
      res => console.log(res)
    ).catch(err => console.log(err))
  }

}
