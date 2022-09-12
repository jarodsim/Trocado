import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Goal {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: false,
  })
  total_amount: number;

  @Column({
    nullable: false,
  })
  datetime_start: Date;

  @Column({
    nullable: false,
  })
  datetime_end: Date;

  @Column({
    nullable: false,
  })
  type: string;

  @OneToOne((type) => User, (user) => user.id, {
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
