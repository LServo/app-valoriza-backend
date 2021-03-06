import { Request, Response } from 'express'
import { CreateTagService } from '../services/CreateTagService'


class CreateTagController {

  async handle(request: Request, response: Response) {
    const { name } = request.body
    // O mesmo que const data = request.body > data.name
    
    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name)

    return response.json(tag)
  }
}

export { CreateTagController }