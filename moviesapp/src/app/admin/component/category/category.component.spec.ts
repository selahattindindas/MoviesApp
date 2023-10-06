import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategory } from './category.component';

describe('CategoryListComponent', () => {
  let component: AdminCategory;
  let fixture: ComponentFixture<AdminCategory>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategory]
    });
    fixture = TestBed.createComponent(AdminCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
