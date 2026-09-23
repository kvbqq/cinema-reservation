import { TestBed } from '@angular/core/testing';
import { App } from './app';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Cinema Reservation');
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should display the backend status after clicking the button', () => {
    const fixture = TestBed.createComponent(App);
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    const button = page.querySelector('button') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();

    expect(button.disabled).toBe(true);

    const request = http.expectOne({
      method: 'GET',
      url: '/api/status',
    });

    request.flush({
      application: 'Cinema Reservation API',
      status: 'running',
    });

    fixture.detectChanges();

    expect(page.querySelector('h2')?.textContent).toContain('Cinema Reservation API');

    expect(page.textContent).toContain('Status: running');
    expect(button.disabled).toBe(false);
  });
});
