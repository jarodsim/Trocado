import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class FutureMovement {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    nullable: false,
  })
  movement_interval: number;

  @Column({
    nullable: false,
  })
  value: number;

  @Column({
    nullable: false,
  })
  installments: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    nullable: false,
  })
  datetime_next_settlement: Date;

  @Column({
    nullable: false,
  })
  remaining_settlements: number;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.id, {
    cascade: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  category: Category;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  datetime_created: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  datetime_updated: Date;
}
