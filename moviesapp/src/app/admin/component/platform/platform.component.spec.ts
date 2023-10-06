import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlatform } from './platform.component';

describe('AdminPlatform', () => {
  let component: AdminPlatform;
  let fixture: ComponentFixture<AdminPlatform>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPlatform]
    });
    fixture = TestBed.createComponent(AdminPlatform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
