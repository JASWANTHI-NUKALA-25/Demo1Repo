import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedMedicinesDetailsComponent } from './booked-medicines-details.component';

describe('BookedMedicinesDetailsComponent', () => {
  let component: BookedMedicinesDetailsComponent;
  let fixture: ComponentFixture<BookedMedicinesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookedMedicinesDetailsComponent]
    });
    fixture = TestBed.createComponent(BookedMedicinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
