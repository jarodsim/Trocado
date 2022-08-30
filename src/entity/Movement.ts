import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { User } from './User'
import { Category } from './Category'

@Entity()
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({
    nullable: false,
  })
  value: number

  @Column({
    nullable: false,
  })
  description: string

  @Column({
    nullable: false,
  })
  type: string

  @OneToOne((type) => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  user: User

  @OneToOne((type) => Category, (category) => category.id, {
    cascade: true,
    nullable: false,
  })
  category: Category
}
