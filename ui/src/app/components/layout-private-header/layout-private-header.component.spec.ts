import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPrivateHeaderComponent } from './layout-private-header.component';

describe('LayoutPrivateHeaderComponent', () => {
  let component: LayoutPrivateHeaderComponent;
  let fixture: ComponentFixture<LayoutPrivateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutPrivateHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPrivateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
