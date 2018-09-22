import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
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

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
