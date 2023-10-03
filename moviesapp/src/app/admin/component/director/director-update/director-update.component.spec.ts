import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorUpdateComponent } from './director-update.component';

describe('DirectorUpdateComponent', () => {
  let component: DirectorUpdateComponent;
  let fixture: ComponentFixture<DirectorUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorUpdateComponent]
    });
    fixture = TestBed.createComponent(DirectorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
