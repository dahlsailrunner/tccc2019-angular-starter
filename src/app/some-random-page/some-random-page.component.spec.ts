import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeRandomPageComponent } from './some-random-page.component';

describe('SomeRandomPageComponent', () => {
  let component: SomeRandomPageComponent;
  let fixture: ComponentFixture<SomeRandomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomeRandomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeRandomPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
