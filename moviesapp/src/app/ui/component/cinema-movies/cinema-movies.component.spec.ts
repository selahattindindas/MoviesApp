import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaMoviesComponent } from './cinema-movies.component';

describe('CinemaMoviesComponent', () => {
  let component: CinemaMoviesComponent;
  let fixture: ComponentFixture<CinemaMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CinemaMoviesComponent]
    });
    fixture = TestBed.createComponent(CinemaMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
