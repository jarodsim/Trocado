import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Balance {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    nullable: false,
  })
  total: number;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  user: User;

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
