import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayLoad {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receber o token
  const authToken = request.headers.authorization
  
  // Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end() // poderia ser passada uma mensagem customizada utilizando "json({message:'Token is missing'})"
    // da maneira como está, enviará a mensagem padrão para o status code 400, que é "Unauthorized", ou seja, não autorizado
  }

  // Validar se o token é valido
  const [,token] = authToken.split(' ')
  try {
    const { sub } = verify(token, '484a7c311864834e9827a313e78cf575') as IPayLoad
    // Recuperar informações do usuário
    request.user_id = sub

    return next()
  } catch (err) {
    return response.status(401).end()
  }

}