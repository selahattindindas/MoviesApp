import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetflixComponent } from './netflix.component';

describe('NetflixComponent', () => {
  let component: NetflixComponent;
  let fixture: ComponentFixture<NetflixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetflixComponent]
    });
    fixture = TestBed.createComponent(NetflixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
