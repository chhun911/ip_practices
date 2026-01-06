import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATION_FEATURES, NOTIFICATION_OPTIONS } from './constants';
import { NotificationFeatureOptions, NotificationModuleOptions, NotificationChannel } from './interfaces';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_OPTIONS)
    private readonly options: NotificationModuleOptions,

    @Inject(NOTIFICATION_FEATURES)
    private readonly features: NotificationFeatureOptions[],
  ) {
    console.log('[NotificationsService] Registered features:', JSON.stringify(this.features));
  }

  // Get feature config by name
  private getFeature(featureName: string): NotificationFeatureOptions | undefined {
    return this.features.find(f => f.featureName === featureName);
  }

  // Resolve channels (feature override -> global default)
  private resolveChannels(feature?: NotificationFeatureOptions): NotificationChannel[] {
    if (!this.options.enable) return [];
    if (feature?.channels?.length) return feature.channels;
    return [this.options.defaultChannel];
  }

  notify(featureName: string, event: string, payload: any) {
    if (!this.options.enable) return { skipped: true, reason: 'notifications disabled' };

    const feature = this.getFeature(featureName);

    // Challenge A: per-feature enable override
    if (feature?.enable === false) {
      return { skipped: true, reason: `feature '${featureName}' is disabled` };
    }
    const channels = this.resolveChannels(feature);

    const prefix = feature?.prefix ?? `[${featureName.toUpperCase()}]`;
    const message = `${prefix} (${this.options.appName}) ${event}`;

    // For lab: only log, pretend “channels”
    for (const ch of channels) {
      console.log(`[${ch.toUpperCase()}] ${message}`, payload);
    }

    return { ok: true, channels, featureName, event };
  }
}