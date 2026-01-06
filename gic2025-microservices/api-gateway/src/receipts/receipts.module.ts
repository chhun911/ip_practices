import { Module } from "@nestjs/common";
import { ReceiptsController } from "./receipts.controller";
import { ReceiptsService } from "./receipts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Receipt } from "../database/receipts.entity";
import { NotificationModule } from 'src/notifications/notification.module';

@Module({
    imports: [TypeOrmModule.forFeature([Receipt]), 
    NotificationModule.forFeature({
      featureName: 'receipts',
      prefix: '[RECEIPTS]',
      channels: ['log'],
    })],
    providers: [ReceiptsService],
    controllers: [ReceiptsController],
})
export class ReceiptsModule {}