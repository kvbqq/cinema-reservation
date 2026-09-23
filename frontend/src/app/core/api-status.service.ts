import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ApiStatus {
  application: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiStatusService {
  private readonly http = inject(HttpClient);

  getStatus() {
    return this.http.get<ApiStatus>('/api/status');
  }
}
