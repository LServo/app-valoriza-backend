import { getCustomRepository } from "typeorm"
import { TagsRepositories } from '../repositories/TagsRepositories'

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories) // pega o repositorio de tags
  

    if (!name) {
      throw new Error('Name is incorrect')
    }; // verifica se a tag existe e joga um erro se não

    // SELECT * FROM tags WHERE name = name
    const tagAlreadyExists = await tagsRepositories.findOne({
      name
   }) // verifica se a tag já existe

   if (tagAlreadyExists) {
     throw new Error('Tag already exists')
    } // se a tag já existe joga um erro
    
    const tag = tagsRepositories.create({
      name
    }) // se não existe, cria a tag

    await tagsRepositories.save(tag) // salva a tag no banco de dados

    return tag // retorna a tag criada
  }
}

export {CreateTagService}