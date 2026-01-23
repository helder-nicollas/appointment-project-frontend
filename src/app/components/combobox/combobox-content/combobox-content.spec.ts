import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxContent } from './combobox-content';

describe('ComboboxContent', () => {
  let component: ComboboxContent;
  let fixture: ComponentFixture<ComboboxContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboboxContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboboxContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
