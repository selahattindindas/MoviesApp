import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformUpdateComponent } from './platform-update.component';

describe('PlatformUpdateComponent', () => {
  let component: PlatformUpdateComponent;
  let fixture: ComponentFixture<PlatformUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlatformUpdateComponent]
    });
    fixture = TestBed.createComponent(PlatformUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
