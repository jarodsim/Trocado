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
export class Movement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
  })
  value: number;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    nullable: false,
  })
  type: string;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: true,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.id, {
    cascade: true,
    nullable: true,
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
