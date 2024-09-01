/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    wallet_id: number;

    // Specify if transaction is income or expense
    @Column({ length: 30 })
    type: string;
    
    @Column({ length: 100 })
    description: string;

    @Column({ length: 30 })
    date: string;

    @Column()
    amount: number

}
