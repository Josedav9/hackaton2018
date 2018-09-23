import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
//Router
import { AppRoutingModule } from './app.routes'
//Servicio
import { FirebaseService } from './services/firebase.service'
//Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Material
import { AppMaterialModule } from './app.material.module';
//AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { MapaSistemaComponent } from './components/mapa-sistema/mapa-sistema.component';
import { MatricesComponent } from './components/matrices/matrices.component';
import { HomeComponent } from './components/home/home.component';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    MapaSistemaComponent,
    MatricesComponent,
    HomeComponent,
    LoginComponent,
    RegistrarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC8lr_1IlZNloVE8K_BfPu64w9x1DcB3XM'
    })
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
