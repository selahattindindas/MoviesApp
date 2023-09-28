import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPlatformComponent } from './popular-platform.component';

describe('PopularPlatformComponent', () => {
  let component: PopularPlatformComponent;
  let fixture: ComponentFixture<PopularPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularPlatformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
