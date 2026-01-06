import { Inject } from '@nestjs/common';
import { NotificationsService } from './notification.service';

// Symbol to store metadata on methods
const NOTIFY_METADATA_KEY = Symbol('notify_metadata');

export interface NotifyOptions {
  featureName: string;
  event: string;
  payloadExtractor?: (result: any, args: any[]) => any; // optional: extract payload from result/args
}

/**
 * @Notify() Decorator - Challenge B
 * 
 * Automatically triggers a notification after the decorated method executes.
 * 
 * Usage:
 * @Notify({ featureName: 'orders', event: 'order.created' })
 * async createOrder(dto: CreateOrderDto) { ... }
 * 
 * Or with payload extractor:
 * @Notify({ 
 *   featureName: 'orders', 
 *   event: 'order.created',
 *   payloadExtractor: (result, args) => ({ orderId: result.id, dto: args[0] })
 * })
 */
export function Notify(options: NotifyOptions): MethodDecorator {
  // Inject the NotificationsService property key
  const injectNotificationService = Inject(NotificationsService);

  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    // Store metadata for this method
    Reflect.defineMetadata(NOTIFY_METADATA_KEY, options, target, propertyKey);

    // Inject NotificationsService into the class if not already injected
    const notificationServiceKey = '__notificationsService__';
    injectNotificationService(target, notificationServiceKey);

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // Get the injected NotificationsService
      const notificationsService: NotificationsService = this[notificationServiceKey];

      // Call the original method
      const result = await originalMethod.apply(this, args);

      // Extract payload
      const payload = options.payloadExtractor
        ? options.payloadExtractor(result, args)
        : result;

      // Trigger notification
      if (notificationsService) {
        notificationsService.notify(options.featureName, options.event, payload);
      } else {
        console.warn(
          `[Notify Decorator] NotificationsService not available for ${String(propertyKey)}`,
        );
      }

      return result;
    };

    return descriptor;
  };
}

/**
 * Alternative simpler decorator that works with explicit service injection
 * Use this when you already inject NotificationsService in your class
 * 
 * Usage:
 * @NotifyAfter('orders', 'order.created')
 * async createOrder(dto: CreateOrderDto) { ... }
 */
export function NotifyAfter(
  featureName: string,
  event: string,
  servicePropertyName: string = 'notificationsService',
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      // Access the NotificationsService from the class instance
      const notificationsService: NotificationsService = this[servicePropertyName];

      if (notificationsService && typeof notificationsService.notify === 'function') {
        notificationsService.notify(featureName, event, result);
      } else {
        console.warn(
          `[NotifyAfter] NotificationsService not found at '${servicePropertyName}' for ${String(propertyKey)}`,
        );
      }

      return result;
    };

    return descriptor;
  };
}
