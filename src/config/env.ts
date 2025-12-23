import 'dotenv/config'
export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),

  mongo: {
    uri: process.env.MONGO_URI || '',
    db: process.env.MONGO_DB || '',
  },
}
