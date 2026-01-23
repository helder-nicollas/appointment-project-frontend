import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxSearch } from './combobox-search';

describe('ComboboxSearch', () => {
  let component: ComboboxSearch;
  let fixture: ComponentFixture<ComboboxSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
