import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineListComponent } from './list-of-medicines.component';

describe('ListOfMedicinesComponent', () => {
  let component: MedicineListComponent;
  let fixture: ComponentFixture<MedicineListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineListComponent]
    });
    fixture = TestBed.createComponent(MedicineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
