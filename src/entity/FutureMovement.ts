import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
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

  @OneToOne((type) => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  user: User;

  @OneToOne((type) => Category, (category) => category.id, {
    cascade: true,
    nullable: false,
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
