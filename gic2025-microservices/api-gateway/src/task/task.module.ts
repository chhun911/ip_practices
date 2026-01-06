import { Module } from "@nestjs/common";
import { NotificationModule } from "src/notification/notification.module";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

@Module({
    imports: [
        NotificationModule.register({
            type: 'log',
        }),
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}