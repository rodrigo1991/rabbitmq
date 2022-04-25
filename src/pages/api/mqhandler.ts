import { NextApiRequest, NextApiResponse } from 'next';
import amqp from 'amqplib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const product: Product = req.body;
    const exchange = 'product_exchange';
    const queue = 'mail';
    const route = 'mail_route';

    const uri = 'localhost';
    const user = 'segal';
    const pass = 'xxxxxxxx';
    const url = `amqp://${user}:${pass}@${uri}`;

    try {
      const connection = await amqp.connect(url);
      const channel = await connection.createChannel();

      await channel.assertExchange(exchange, 'direct');
      await channel.assertQueue('mail');
      await channel.bindQueue(queue, exchange, route);

      const sent = channel.publish(
        exchange,
        route,
        Buffer.from(JSON.stringify(product))
      );

      if (sent)
        console.info(
          `${
            product.id
          } - Sent message to ${exchange} -> ${route} ${JSON.stringify(
            product
          )}`
        );
      else
        console.error(
          `${product.id} - Fail sending message to ${exchange} -> ${
            process.env.TRX_ROUTE
          }
          ${JSON.stringify(product)}`
        );
      res.status(200).json(product);
    } catch (err) {
      console.error('Error in rabbitMQ', err);
      res.statusCode = 500;
      res.end();
    }
  } else {
    res.statusCode = 405;
    res.end();
  }
}
