import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPlatformComponent } from './popular-platform.component';

describe('PopularPlatformComponent', () => {
  let component: PopularPlatformComponent;
  let fixture: ComponentFixture<PopularPlatformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularPlatformComponent]
    });
    fixture = TestBed.createComponent(PopularPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
