import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute } from '@angular/router'
import { trip } from '../../interfaces/trips.interface'

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {
   
  lat: number = 4.6412685
  lng: number = -74.0817906
  zoom: number = 13;
  origen
  destino

  constructor( private _fs:FirebaseService, public router:ActivatedRoute ) {
    this.router.params.subscribe( params =>{
      this._fs.viaje(params['id']).valueChanges().subscribe(
        (res:trip) =>{
          this.origen = {
            lat: res.recorrido[0].lat,
            lng: res.recorrido[0].lon
          }
          this.destino = {
            lat: res.recorrido[1].lat,
            lng: res.recorrido[1].lon
          }
        }
      )
    })
  }

  ngOnInit() {
  }

}
