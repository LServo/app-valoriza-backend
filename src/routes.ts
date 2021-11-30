import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ListUserSendComplimentsController } from './controllers/LustUserSendComplimentsController'
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUsersController } from './controllers/ListUsersController'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

// router.use(ensureAdmin)
// a verificação de adm poderia ser passada asim, porém, neste caso, seria aplciada a todas as rotas que vem abaixo, e não faz sentido pedir que o usuário seja admin na rota de criação de usuário, por exemplo.. nem tem como
// neste caso, podemos passar a função ensureAdmin mo meio do caminho, entre a rota e a função final

router.post('/users', createUserController.handle) // não é necessário identificar que está passando o req e o res, porque o handle já especificou que está recebendo isso
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle) // geralmente definimos o recurso como plural ('/tags')

router.post('/login', authenticateUserController.handle)
router.post('/compliments', ensureAuthenticated, createComplimentController.handle)

router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle)
router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle)

router.get('/tags', ensureAuthenticated, listTagsController.handle)

router.get('/users', ensureAuthenticated, listUsersController.handle)

export { router }