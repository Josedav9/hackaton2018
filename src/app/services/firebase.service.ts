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
        this.bikeCollection = this.db.collection<bikes>('bicicleta');
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

    crearEstacion(estacion: station) {
        return this.stationCollection.add(estacion)
    }

    obtenerEstaciones() {
        return this.stationCollection
    }

    tomarPrestadaBicicleta(bicicleta, estacion) {
        let usuario = JSON.parse(localStorage.getItem('usuario'))
        let viaje: trip = {
            est_origin: estacion.nombre,
            fecha_ini: new Date(),
            recorrido: [
                {
                    lat: estacion.lat,
                    lon: estacion.lon
                }
            ]
        }
        this.stationCollection.doc(`${estacion.id}`).update({ 'bicicletas': estacion.bicicletas })
            .then(res => {
                this.usersCollection.doc(`${usuario.id}`).update({ 'prestada': bicicleta }).then(
                    res => this.bikeCollection.doc(`${bicicleta}`).update({ 'prestada': true }).then(
                        res => this.tripCollection.add(viaje).then(res => {
                            this.usersCollection.doc(`${usuario.id}`).collection('viajes')
                                .doc(res.id).set(viaje).then(
                                    viajeBici => this.bikeCollection.doc(`${bicicleta}`).collection('viajes')
                                        .doc(res.id).set(viaje).then(
                                            bike => {
                                                usuario.viaje_actual = res.id;
                                                usuario.prestada = bicicleta;
                                                localStorage.setItem('usuario', JSON.stringify(usuario))
                                                this.usersCollection.doc(usuario.id).update({ 'viaje_actual': res.id })
                                            }
                                        )
                                )
                        })
                    )
                )
            })

    }

    regresarBicicleta(estacion: station) {
        let usuario: User = JSON.parse(localStorage.getItem('usuario'))
        let fecha_fin = new Date()
        let est_destino = estacion.nombre;
        let viaje = [{
            lat: estacion.lat,
            lon: estacion.lon
        }]
        let trip;
        estacion.bicicletas.push(usuario.prestada);
        return this.usersCollection.doc(usuario.id).collection('viajes').doc(usuario.viaje_actual)
            .set({ 'est_destino': est_destino, 'fecha_fin': fecha_fin, 'recorrido': viaje }, {merge: true}).then(
                res => this.bikeCollection.doc(usuario.prestada).collection('viajes').doc(usuario.viaje_actual)
                    .update({ 'est_destino': est_destino, 'fecha_fin': fecha_fin }).then(
                        res => this.tripCollection.doc(usuario.viaje_actual).update({ 'est_destino': est_destino, 'fecha_fin': fecha_fin }).then(
                            res => this.bikeCollection.doc(usuario.prestada).update({ 'prestada': false }).then(
                                res => {
                                    usuario.viaje_actual = null;
                                    usuario.prestada = null;
                                    localStorage.setItem('usuario', JSON.stringify(usuario))
                                    this.usersCollection.doc(usuario.id).update({ 'viaje_actual': null, 'prestada': null }).then(
                                        res => this.stationCollection.doc(estacion.id).update({'bicicletas': estacion.bicicletas})
                                    )
                                }
                            )
                        )
                    )
            )
    }

}