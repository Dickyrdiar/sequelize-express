const Redis = require('ioredis')

const redis = new Redis({
  host: '127.0.0.1', // Replace with your Redis server host
  port: 6379,        // Default Redis port
  password: null, 
})

redis.on('connect', () => {
  console.log('Connected to Redis')
})

redis.on('error', (err) => {
  console.error('redis error:', err)
})

module.exports = redis;