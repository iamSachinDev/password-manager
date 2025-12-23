import { Request, Response, NextFunction } from 'express'

export function securityMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  // Block suspicious payload sizes
  if (JSON.stringify(req.body || {}).length > 10_000) {
    throw new Error('Payload too large')
  }

  next()
}
