import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOrdersListComponent } from './custom-orders-list.component';

describe('CustomOrdersListComponent', () => {
  let component: CustomOrdersListComponent;
  let fixture: ComponentFixture<CustomOrdersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomOrdersListComponent]
    });
    fixture = TestBed.createComponent(CustomOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
