import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilbarComponent } from './utilbar.component';

describe('UtilbarComponent', () => {
  let component: UtilbarComponent;
  let fixture: ComponentFixture<UtilbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
