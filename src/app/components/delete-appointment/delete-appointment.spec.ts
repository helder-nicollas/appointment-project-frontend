import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAppointment } from './delete-appointment';

describe('DeleteAppointment', () => {
  let component: DeleteAppointment;
  let fixture: ComponentFixture<DeleteAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAppointment],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAppointment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
