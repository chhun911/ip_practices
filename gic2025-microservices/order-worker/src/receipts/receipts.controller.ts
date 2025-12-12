import { Controller, Get } from "@nestjs/common";
import { get } from "http";

@Controller('receipts')    

export class ReceiptsController {
    //define get endpoint for /receipts
    @Get()
    getAllreceipts() {
        return "This action returns all receipts";
    }
}
