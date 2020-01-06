import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowRenderBaseComponent } from './window-render-base.component';

describe('WindowRenderBaseComponent', () => {
  let component: WindowRenderBaseComponent;
  let fixture: ComponentFixture<WindowRenderBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowRenderBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowRenderBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
