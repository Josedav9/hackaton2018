import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component'
import { MapaSistemaComponent } from './components/mapa-sistema/mapa-sistema.component'
import { MatricesComponent } from './components/matrices/matrices.component'
import { LoginComponent } from './components/login/login.component'
import { RegistrarComponent } from './components/registrar/registrar.component'

const routes: Route[] = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistrarComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'mapaSistema', component: MapaSistemaComponent },
    { path: 'matrices', component: MatricesComponent },
    { path: '**', component: HomeComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
