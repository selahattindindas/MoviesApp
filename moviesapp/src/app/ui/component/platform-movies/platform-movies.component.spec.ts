import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformMoviesComponent } from './platform-movies.component';

describe('PlatformMoviesComponent', () => {
  let component: PlatformMoviesComponent;
  let fixture: ComponentFixture<PlatformMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformMoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
