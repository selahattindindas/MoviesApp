import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlayoutComponent } from './admin-layout.component';

describe('AdminlayoutComponent', () => {
  let component: AdminlayoutComponent;
  let fixture: ComponentFixture<AdminlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminlayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
