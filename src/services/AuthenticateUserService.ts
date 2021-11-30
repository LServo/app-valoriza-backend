import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    // verificar se email existe
    const userAlreadyExists = await usersRepositories.findOne({
      email
    })

    if (!userAlreadyExists) {
      throw new Error('Email/Password is incorrect')
    }

    // verificar se senha está correta
    const passwordMatch = compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new Error('Email/Password is incorrect')
    }

    // se estiver correta geramos um token, se não, retornamos erro
    const token = sign({
      email: userAlreadyExists.email
    },
    '484a7c311864834e9827a313e78cf575', 
    {
      subject: userAlreadyExists.id,
      expiresIn: "1d"
    })
    return token
  }

}

export { AuthenticateUserService }