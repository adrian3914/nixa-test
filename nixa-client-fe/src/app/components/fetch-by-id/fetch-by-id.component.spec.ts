import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchByIdComponent } from './fetch-by-id.component';

describe('FetchByIdComponent', () => {
  let component: FetchByIdComponent;
  let fixture: ComponentFixture<FetchByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
