import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacerCardComponent } from './racer-card.component';

describe('RacerCardComponent', () => {
  let component: RacerCardComponent;
  let fixture: ComponentFixture<RacerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
