import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceDialog } from './update-service-dialog';

describe('UpdateServiceDialog', () => {
  let component: UpdateServiceDialog;
  let fixture: ComponentFixture<UpdateServiceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateServiceDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateServiceDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
