import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

/**
 * Component-Level Provider Demonstration (Step 67):
 * Providing NotificationService in the @Component decorator providers array overrides any root provider
 * and creates a brand-new, isolated instance of NotificationService scoped exclusively to this component
 * instance and its children. Destroying the component destroys this service instance.
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService], // Component-level provider creates scoped instance
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class NotificationComponent implements OnInit {
  notifications: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  addAlert(): void {
    this.notificationService.addNotification(`Alert generated at ${new Date().toLocaleTimeString()}`);
    this.notifications = this.notificationService.getNotifications();
  }

  clearAlerts(): void {
    this.notificationService.clear();
    this.notifications = this.notificationService.getNotifications();
  }
}

export { NotificationComponent as Notification };
