import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { hash } from 'bcryptjs'

interface IUserRequest {
    name: string,
    email: string,
    admin?: boolean,
    password: string
}

class CreateUserService {
  async execute ({name, email, admin = false, password} : IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)// não é possível fazer um new UsersRepositories() porque estamos utilizando um repositório cutomizado

    if (!email) {
      throw new Error('Email is incorrect')
    }

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new Error('User already existss')
    }

    const passwordHash = await hash(password, 8) // 8 é o padrão

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserService }