import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCinemaComponent } from './popular-cinema.component';

describe('PopularCinemaComponent', () => {
  let component: PopularCinemaComponent;
  let fixture: ComponentFixture<PopularCinemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularCinemaComponent]
    });
    fixture = TestBed.createComponent(PopularCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
