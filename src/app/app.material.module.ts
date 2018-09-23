import { NgModule } from "@angular/core";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
    imports:[
        MatSidenavModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule
    ],
    exports:[
        MatSidenavModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule
    ]
})

export class AppMaterialModule{

}