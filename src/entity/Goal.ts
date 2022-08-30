import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({
    nullable: false,
  })
  title: string

  @Column()
  description: string

  @Column({
    nullable: false,
  })
  total_amount: number

  @Column({
    nullable: false,
  })
  datetime_start: Date

  @Column({
    nullable: false,
  })
  datetime_end: Date

  @Column({
    nullable: false,
  })
  type: string

  @OneToOne((type) => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  user: User
}
