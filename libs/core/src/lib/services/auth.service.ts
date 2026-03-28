import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSignal = signal<string | null>(null);
  private userSignal = signal<any>(null);

  readonly token = computed(() => this.tokenSignal());
  readonly user = computed(() => this.userSignal());
  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  setToken(token: string | null): void {
    this.tokenSignal.set(token);
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    if (!this.tokenSignal()) {
      const stored = localStorage.getItem('auth_token');
      if (stored) {
        this.tokenSignal.set(stored);
      }
    }
    return this.tokenSignal();
  }

  setUser(user: any): void {
    this.userSignal.set(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  login(token: string, user: any): void {
    this.setToken(token);
    this.setUser(user);
  }

  logout(): void {
    this.setToken(null);
    this.setUser(null);
  }
}
