const { Kafka } = require('kafkajs')
const { randomUUID } = require('node:crypto')

async function bootstrap() {
    const kafka = new Kafka({
        clientId: 'kafka-producer',
        brokers: ['charming-jawfish-10756-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'Y2hhcm1pbmctamF3ZmlzaC0xMDc1NiTASjGP85DNlJWl2pWjONq0s1wkVwoe8nI',
          password: 'f6bfd4da4dcc4eabbc848267d51e666a',
        },
        ssl: true,
    })

    const producer = kafka.producer()

    await producer.connect()
    
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    recipientId: randomUUID(),
                    content: 'Nova solicitação de amizade!',
                    category: 'social'
                })
            }
        ]
    })

    await producer.disconnect()
}

bootstrap()