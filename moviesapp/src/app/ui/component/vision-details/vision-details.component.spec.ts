import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionDetailsComponent } from './vision-details.component';

describe('VisionDetailsComponent', () => {
  let component: VisionDetailsComponent;
  let fixture: ComponentFixture<VisionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
