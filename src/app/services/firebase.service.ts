import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { bikes } from '../interfaces/bikes.interface'
import { station } from '../interfaces/station.interface'
import { User } from '../interfaces/user.interface'
import { trip } from '../interfaces/trips.interface'
import { AngularFireAuth } from '@angular/fire/auth'



@Injectable()
export class FirebaseService {
    private usersCollection: AngularFirestoreCollection<User>
    private bikeCollection: AngularFirestoreCollection<bikes>
    public stationCollection: AngularFirestoreCollection<station>
    private tripCollection: AngularFirestoreCollection<trip>

    constructor(public db: AngularFirestore, public fauth: AngularFireAuth) {
        this.usersCollection = this.db.collection<User>('usuario');
        this.bikeCollection = this.db.collection<bikes>('bicicletas');
        this.stationCollection = this.db.collection<station>('estacion');
        this.tripCollection = this.db.collection<trip>('viaje');
    }

    crearUsuario(email: string, password: string): Promise<any> {
        return this.fauth.auth.createUserWithEmailAndPassword(email, password)
    }

    login(email: string, password: string): Promise<any> {
        return this.fauth.auth.signInWithEmailAndPassword(email, password)
    }

    logout(): void {
        this.fauth.auth.signOut().then(
            resp => {
                localStorage.removeItem('usuario');
            }
        );
    }

    obtenerUsuario(cedula: number) {
        return this.db.collection<User>('usuario', ref => ref.where('cedula', '==', cedula));
    }

    crearEstacion(estacion: station) {
        return this.stationCollection.add(estacion)
    }

    obtenerEstaciones(){
        return this.stationCollection
    }
}