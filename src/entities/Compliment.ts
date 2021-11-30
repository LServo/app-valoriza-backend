import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Tag } from "./Tag";
import { User } from "./User";

@Entity('compliments')
class Compliment {
  @PrimaryColumn()
  readonly id: string

  @Column()
  user_sender: string

  @JoinColumn({ name: 'user_sender' })
  @ManyToOne(() => User)
  userSender: User 

  @Column()
  user_receiver: string

  @JoinColumn({name: 'user_receiver'})
  @ManyToOne(() => User)
  userReceiver: User

  @Column()
  tag_id: string

  @JoinColumn({name: 'tag_id'}) // linkando a entidade Tag.ts para que apareça nos resultados das buscas efetuadas pelo tag_id
  @ManyToOne(() => Tag) // permite que varios elogios sejam criados com uma mesma tag
  tag: Tag

  @Column()
  message: string

  @CreateDateColumn()
  created_at: Date

  constructor(){
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Compliment }