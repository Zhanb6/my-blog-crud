// src/components/Notification.tsx
import { notification } from 'antd';
// ← заменили NotificationArgsProps на ArgsProps
import type { ArgsProps } from 'antd/lib/notification';

type NotifyType = 'success' | 'error' | 'info' | 'warning';
const DEFAULT_DURATION = 3;

export function notify(
  type: NotifyType,
  message: string,
  description?: string,
  // теперь используем ArgsProps вместо NotificationArgsProps
  args?: Omit<ArgsProps, 'message' | 'description' | 'duration'>
) {
  notification[type]({
    message,
    description,
    duration: DEFAULT_DURATION,
    ...args,
  });
}

export const notifySuccess = (msg: string, desc?: string) =>
  notify('success', msg, desc);

export const notifyError = (msg: string, desc?: string) =>
  notify('error', msg, desc);

export const notifyInfo = (msg: string, desc?: string) =>
  notify('info', msg, desc);

export const notifyWarning = (msg: string, desc?: string) =>
  notify('warning', msg, desc);
