import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'
import { station } from '../../interfaces/station.interface'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      map(actions => actions.map( a => {
        const data = a.payload.doc.data() as station
        const id = a.payload.doc.id
        return {id, ...data}
      }))
    )
  }

  crearMarcador(event) {
    let estacion:station={
      lat: event.coords.lat,
      lon: event.coords.lng,
      nombre: "pepito",
      tipo: "normal",
      espacios: 3,
      bicicletas: []
    }
    console.log(event)
    this._fs.crearEstacion(estacion).then(
      res => console.log(res)
    ).catch(err => console.log(err))
  }

  verificarEstado(estacion){
    console.log(estacion)
    if (!this.viaje) {this.tomarBicicleta(estacion)}
    else {this.devolverBicicleta(estacion)}
  }

  tomarBicicleta(estacion){
    if(estacion.bicicletas.length > 0){
      this.viaje = true
      estacion.espacios = estacion.espacios + 1;
      estacion.bicicletas.pop()
    }else{
      console.log('NO HAY CICLAS CARE NALGA')
    }
  }

  devolverBicicleta(estacion){
    this.viaje = !this.viaje
    estacion.espacios = estacion.espacios - 1;
    estacion.bicicletas.push('I SEE A LINE OF CARS AND I WANT TO PAINT THEM BLACK')
  }

}
