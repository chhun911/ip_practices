import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('receipts')
export class Receipt {
    @PrimaryGeneratedColumn('uuid')
    receiptId: string;
   
    @Column({ type: 'timestamp', nullable: false })
    issuedAt: Date;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'numeric', nullable: false })
    price: number; 

}