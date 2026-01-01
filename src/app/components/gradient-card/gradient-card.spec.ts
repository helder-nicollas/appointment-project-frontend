import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientCard } from './gradient-card';

describe('GradientCard', () => {
  let component: GradientCard;
  let fixture: ComponentFixture<GradientCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
