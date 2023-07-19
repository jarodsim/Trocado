import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Balance } from "./Balance";
import { Category } from "./Category";
import { Goal } from "./Goal";
import { Movement } from "./Movement";

@Entity()
export class User {
  @PrimaryColumn("uuid", {
    generated: false,
  })
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

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

  @OneToMany(() => Goal, (goal) => goal.id, {
    cascade: true,
    nullable: true,
  })
  goals: Goal[];

  @OneToMany(() => Category, (category) => category.id, {
    cascade: true,
    nullable: true,
  })
  categories: Category[];

  @OneToMany(() => Balance, (balance) => balance.id, {
    cascade: true,
    nullable: true,
  })
  balances: Balance[];

  @OneToMany(() => Movement, (movement) => movement.id, {
    cascade: true,
    nullable: true,
  })
  movements: Movement[];
}
