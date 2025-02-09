import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  supplierId: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  address: string;
  @Column({
    nullable:true
  })
  gstNumber: string;
  @Column({
    nullable:true
  })
  additionalInfo: string;
  @Column()
  mobileNumber: string;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdDate: Date
  @UpdateDateColumn()
  updatedDate: Date
  @DeleteDateColumn()
  deletedAt?: Date;
}
