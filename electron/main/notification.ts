import { Notification } from 'electron';

export function showDesktopNotification(title: string, body: string) {
    const notification = new Notification({
        title,
        body,
    });

    notification.show();
}
