import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesCartComponent } from './medicines-cart.component';

describe('MedicinesCartComponent', () => {
  let component: MedicinesCartComponent;
  let fixture: ComponentFixture<MedicinesCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicinesCartComponent]
    });
    fixture = TestBed.createComponent(MedicinesCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
