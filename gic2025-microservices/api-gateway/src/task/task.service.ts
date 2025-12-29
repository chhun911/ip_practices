import { Injectable } from "@nestjs/common";
import { NotificationService } from "src/notification/notification.service";

@Injectable()
export class TaskService {
    constructor(private readonly notificationService: NotificationService) {}
    create(task: any) {
        // Logic to create a task
        this.notificationService.notify(`Task "${task.title}" created.`);
    }
}