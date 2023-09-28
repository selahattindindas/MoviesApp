import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCreateComponent } from './MovieCreateComponent';

describe('CreateComponent', () => {
  let component: MovieCreateComponent;
  let fixture: ComponentFixture<MovieCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
