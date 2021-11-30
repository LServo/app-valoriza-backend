import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from 'class-transformer'

class ListTagsService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories)

    let tags = await tagsRepositories.find();
    // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }))
    // essa solução não é legal porque precisamos primeiro procurar, paa depois poder manipular o elemento fora do banco dedados
    // como solução podemos utilizar uma biblioteca para expor e manipular os verdadeiros elementos

    return classToPlain(tags)
  }
}

export { ListTagsService }