import { Request, Response, NextFunction } from 'express'

export function securityHeaders(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  // Enforce HTTPS (safe even behind load balancer if terminated properly)
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )

  // Prevent caching of sensitive data
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  // Disable DNS prefetch
  res.setHeader('X-DNS-Prefetch-Control', 'off')

  // Disable file download execution in IE
  res.setHeader('X-Download-Options', 'noopen')

  // Restrict powerful browser features (safe defaults)
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  )

  next()
}
