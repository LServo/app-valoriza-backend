import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';

import './database'
import 'express-async-errors'
import { router } from './routes';

const app = express()

app.use(express.json()) // é necessário habilitar o express a receber respostas json
app.use(router)

// pega todos os erros derivados do servidor, desta forma, precisamos apenas jogar os erros dentro das condicionais desejadas da aplicação
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3000, () => console.log('Server is running on port 3000'))