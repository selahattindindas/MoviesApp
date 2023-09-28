import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLayoutComponentComponent } from './ui-layout-component.component';

describe('UiLayoutComponentComponent', () => {
  let component: UiLayoutComponentComponent;
  let fixture: ComponentFixture<UiLayoutComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiLayoutComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
