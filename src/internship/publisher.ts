import amqp from "amqplib"

export const publishInternshipCompleted = async (internship: {
  id: string
  company: string
  role: string
  duration: string
  location: string
}) => {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL ?? "amqp://localhost:5672")
    const channel = await conn.createChannel()
    const queue = "internship_completed"

    await channel.assertQueue(queue, { durable: true })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(internship)), { persistent: true })

    console.log("Sent internship_completed event to RabbitMQ:", internship)
    setTimeout(() => {
      conn.close()
    }, 500)
  } catch (error) {
    console.error("Error publishing internship_completed to RabbitMQ:", error)
  }
}

