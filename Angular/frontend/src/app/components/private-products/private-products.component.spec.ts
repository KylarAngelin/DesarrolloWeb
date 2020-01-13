import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateProductsComponent } from './private-products.component';

describe('PrivateProductsComponent', () => {
  let component: PrivateProductsComponent;
  let fixture: ComponentFixture<PrivateProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
