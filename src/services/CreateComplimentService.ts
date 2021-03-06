import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"


interface iComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({tag_id, user_sender, user_receiver, message}: iComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
    const usersRepositories = getCustomRepository(UsersRepositories)

    if (user_sender == user_receiver) {
      throw new Error('Incorrect User Receiver')
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver) // não é necessário abrir um objeto e definir id: user_receiver, porque por padrão o findOne() já pega o id

    if (!userReceiverExists) {
      throw new Error('User Receiver does not exists')
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });

    await complimentsRepositories.save(compliment)

    return compliment
  }
}

export { CreateComplimentService }