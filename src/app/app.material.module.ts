import { NgModule } from "@angular/core";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatListModule} from '@angular/material';

@NgModule({
    imports:[
        MatSidenavModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule
    ],
    exports:[
        MatSidenavModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule
    ]
})

export class AppMaterialModule{

}