import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewListComponent } from './admin-new-list.component';

describe('AdminNewListComponent', () => {
  let component: AdminNewListComponent;
  let fixture: ComponentFixture<AdminNewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
