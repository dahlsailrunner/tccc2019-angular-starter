import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApicallerComponent } from './apicaller.component';

describe('ApicallerComponent', () => {
  let component: ApicallerComponent;
  let fixture: ComponentFixture<ApicallerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApicallerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApicallerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
