import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxOption } from './combobox-option';

describe('ComboboxOption', () => {
  let component: ComboboxOption;
  let fixture: ComponentFixture<ComboboxOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxOption);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
