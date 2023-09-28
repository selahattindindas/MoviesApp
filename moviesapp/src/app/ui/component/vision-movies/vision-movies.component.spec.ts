import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionMoviesComponent } from './vision-movies.component';

describe('VisionMoviesComponent', () => {
  let component: VisionMoviesComponent;
  let fixture: ComponentFixture<VisionMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisionMoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
