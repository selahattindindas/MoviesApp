import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisneyComponent } from './disney.component';

describe('DisneyComponent', () => {
  let component: DisneyComponent;
  let fixture: ComponentFixture<DisneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisneyComponent]
    });
    fixture = TestBed.createComponent(DisneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
