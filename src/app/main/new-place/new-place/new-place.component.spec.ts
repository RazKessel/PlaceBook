import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlaceComponent } from './new-place.component';

describe('NewPlaceComponent', () => {
  let component: NewPlaceComponent;
  let fixture: ComponentFixture<NewPlaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPlaceComponent]
    });
    fixture = TestBed.createComponent(NewPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
