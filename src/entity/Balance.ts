import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({
    nullable: false,
  })
  total: number

  @OneToOne((type) => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  user: User
}
