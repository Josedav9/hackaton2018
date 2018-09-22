import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaSistemaComponent } from './mapa-sistema.component';

describe('MapaSistemaComponent', () => {
  let component: MapaSistemaComponent;
  let fixture: ComponentFixture<MapaSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
