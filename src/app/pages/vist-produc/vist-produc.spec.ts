import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistProduc } from './vist-produc';

describe('VistProduc', () => {
  let component: VistProduc;
  let fixture: ComponentFixture<VistProduc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistProduc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistProduc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
