import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPublicHeaderComponent } from './layout-public-header.component';

describe('LayoutPublicHeaderComponent', () => {
  let component: LayoutPublicHeaderComponent;
  let fixture: ComponentFixture<LayoutPublicHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutPublicHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPublicHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
