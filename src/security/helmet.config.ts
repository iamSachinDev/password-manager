import helmet from 'helmet'

export function helmetMiddleware() {
  return helmet({
    // Prevent MIME sniffing
    noSniff: true,

    // Prevent clickjacking
    frameguard: { action: 'deny' },

    // Hide X-Powered-By
    hidePoweredBy: true,

    // XSS protection (still useful with modern browsers)
    xssFilter: true,

    // Referrer policy
    referrerPolicy: { policy: 'no-referrer' },

    // Content Security Policy
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'"],
        styleSrc: ["'self'"],
        baseUri: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
  })
}
