import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCompras } from './post-compras';

describe('PostCompras', () => {
  let component: PostCompras;
  let fixture: ComponentFixture<PostCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCompras],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCompras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
