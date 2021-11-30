import { EntityRepository, Repository } from 'typeorm'
import { User } from '../entities/User'

@EntityRepository(User) // informando entidade
class UsersRepositories extends Repository<User> {

}

export { UsersRepositories }