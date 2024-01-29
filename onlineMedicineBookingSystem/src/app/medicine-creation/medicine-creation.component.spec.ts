import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineCreationComponent } from './medicine-creation.component';

describe('MedicineCreationComponent', () => {
  let component: MedicineCreationComponent;
  let fixture: ComponentFixture<MedicineCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineCreationComponent]
    });
    fixture = TestBed.createComponent(MedicineCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
