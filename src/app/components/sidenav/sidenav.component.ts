import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  events: string[] = [];
  opened: boolean;

  constructor() { }

  hayUsuario(){
    if(localStorage.getItem('usuario')){
      return true
    }else{
      return false
    }
  }

  logout(){
    localStorage.removeItem('usuario');
  }

  ngOnInit() {
  }

}
