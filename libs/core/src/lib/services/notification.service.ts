import { Injectable, signal } from '@angular/core';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSignal = signal<Notification[]>([]);
  readonly notifications = this.notificationsSignal.asReadonly();

  showSuccess(message: string, duration = 3000): void {
    this.addNotification('success', message, duration);
  }

  showError(message: string, duration = 5000): void {
    this.addNotification('error', message, duration);
  }

  showWarning(message: string, duration = 4000): void {
    this.addNotification('warning', message, duration);
  }

  showInfo(message: string, duration = 3000): void {
    this.addNotification('info', message, duration);
  }

  removeNotification(id: string): void {
    this.notificationsSignal.update((notifications) =>
      notifications.filter((n) => n.id !== id)
    );
  }

  private addNotification(
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    duration?: number
  ): void {
    const notification: Notification = {
      id: crypto.randomUUID(),
      message,
      type,
      duration,
    };

    this.notificationsSignal.update((notifications) => [
      ...notifications,
      notification,
    ]);

    if (duration && duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, duration);
    }
  }
}
