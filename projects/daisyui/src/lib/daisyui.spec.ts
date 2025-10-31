import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Daisyui', () => {
  let component: Daisyui;
  let fixture: ComponentFixture<Daisyui>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Daisyui],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Daisyui);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
