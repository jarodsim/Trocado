import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({
    nullable: false,
  })
  name: string

  @OneToOne((type) => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  user: User
}
