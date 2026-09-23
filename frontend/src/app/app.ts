import { Component, inject, signal } from '@angular/core';
import { ApiStatusService, type ApiStatus } from './core/api-status.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly apiStatusService = inject(ApiStatusService);

  readonly backendStatus = signal<ApiStatus | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  checkBackend(): void {
    this.loading.set(true);
    this.error.set(null);
    this.backendStatus.set(null);

    this.apiStatusService.getStatus().subscribe({
      next: (response) => {
        this.backendStatus.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not reach the backend. Check that Spring Boot is running.');
        this.loading.set(false);
      },
    });
  }
}
