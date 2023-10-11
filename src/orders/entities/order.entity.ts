import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  // @Column()
  // customerId: number;

  @ManyToOne((type) => Customer, (customer) => customer.customerId, {
    cascade: true,
  })
  customerId: Customer;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalBeforeTax: number;

  @Column()
  taxPerctange: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grandTotal: number;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.orderId, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  items: OrderItem[];

  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  @AfterInsert()
  @AfterLoad()
  @AfterUpdate()
  calculateTotals() {
    const total = this.items?.reduce(
      (sum: number, i: OrderItem) => sum + i.cost,
      0,
    );
    this.totalBeforeTax = total;
    this.grandTotal =
      this.totalBeforeTax * (this.taxPerctange / 100) + this.totalBeforeTax;
  }
}
