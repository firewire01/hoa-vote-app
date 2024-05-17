import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterViewComponent } from './voter-view.component';

describe('VoterViewComponent', () => {
  let component: VoterViewComponent;
  let fixture: ComponentFixture<VoterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
