import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleFormComponent } from './responsible-form.component';

describe('ResponsibleFormComponent', () => {
  let component: ResponsibleFormComponent;
  let fixture: ComponentFixture<ResponsibleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsibleFormComponent]
    });
    fixture = TestBed.createComponent(ResponsibleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
