import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxTrigger } from './combobox-trigger';

describe('ComboboxTrigger', () => {
  let component: ComboboxTrigger;
  let fixture: ComponentFixture<ComboboxTrigger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxTrigger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxTrigger);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
