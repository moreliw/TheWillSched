import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiblesComponent } from './responsibles.component';

describe('ResponsiblesComponent', () => {
  let component: ResponsiblesComponent;
  let fixture: ComponentFixture<ResponsiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsiblesComponent]
    });
    fixture = TestBed.createComponent(ResponsiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
