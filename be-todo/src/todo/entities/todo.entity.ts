import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm"

@Entity("todo")
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column({ default: false })
  completed!: boolean

  @CreateDateColumn()
  created_at!: Date
}
