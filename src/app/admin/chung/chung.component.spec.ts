import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChungComponent } from './chung.component';

describe('ChungComponent', () => {
  let component: ChungComponent;
  let fixture: ComponentFixture<ChungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
