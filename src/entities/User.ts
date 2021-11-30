import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn   } from "typeorm";
import { Exclude } from 'class-transformer'
import {v4 as uuid} from 'uuid'

@Entity('users')
class User { 
  @PrimaryColumn() // só precisaria passar algum comando, caso o id passado abaixo tivesse outro nome dentro da tabela do db, neste caso, seria necessario passar o nome que está na tabela do db dentro do PrimaryColumn()
  readonly id: string;
  // adicionado o readonly porque quem fará as alterações no id é o próprio banco de dados, e não o usuário

  @Column()
  name: string;

  @Column()
  email:string;

  @Column()
  admin: boolean;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}
export { User }