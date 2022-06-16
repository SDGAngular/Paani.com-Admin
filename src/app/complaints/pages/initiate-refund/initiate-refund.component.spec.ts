import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateRefundComponent } from './initiate-refund.component';

describe('InitiateRefundComponent', () => {
  let component: InitiateRefundComponent;
  let fixture: ComponentFixture<InitiateRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
