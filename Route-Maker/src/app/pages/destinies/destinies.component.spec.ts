import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestiniesComponent } from './destinies.component';

describe('DestiniesComponent', () => {
  let component: DestiniesComponent;
  let fixture: ComponentFixture<DestiniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestiniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestiniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
