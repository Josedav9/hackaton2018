import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { bikes } from '../interfaces/bikes.interface'
import { station } from '../interfaces/station.interface'
import { User } from '../interfaces/user.interface'
import { trip } from '../interfaces/trips.interface'



@Injectable()
export class FirebaseService {
    private usersCollection: AngularFirestoreCollection<User>
    private bikeCollection: AngularFirestoreCollection<bikes>
    private stationCollection: AngularFirestoreCollection<station>
    private tripCollection: AngularFirestoreCollection<trip>

    constructor( public db:AngularFirestore ){
        this.usersCollection = this.db.collection<User>('usuario');
        this.bikeCollection = this.db.collection<bikes>('bicicletas');
        this.stationCollection = this.db.collection<station>('estacion');
        this.tripCollection = this.db.collection<trip>('viaje');
     }

    crearUsuario( usuario:User ){
        return this.db.collection('usuario').add( usuario );
    }

    obtenerUsuario( cedula:number ){
        return this.db.collection<User>('usuario', ref => ref.where('cedula', '==' ,cedula));
    }

    crearEstacion( estacion:station ){
        return this.stationCollection.add( estacion )
    }

    obtenerEstaciones(){
        return this.stationCollection.valueChanges()
    }



}