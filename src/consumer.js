const amqp = require('amqplib');
const nodemailer = require('nodemailer');

const main = async () => {
  console.log('Init consumer...');
  const exchange = 'product_exchange';
  const queue = 'mail';
  const route = 'mail_route';

  const uri = 'localhost';
  const user = 'segal';
  const pass = 'xxxxxxxx';
  const url = `amqp://${user}:${pass}@${uri}`;

  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();

  await channel.assertExchange(exchange, 'direct');
  await channel.assertQueue('mail');
  await channel.bindQueue(queue, exchange, route);

  channel.consume(
    queue,
    async message => {
      console.log('Consuming message', message);
      if (message) {
        const mensaje = message.content.toString();
        const content = JSON.parse(mensaje);
        console.log('Message from queue', content);

        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });

        const info = await transporter.sendMail({
          from: '"Rodrigo" <rodrigo@example.com>',
          to: 'userloggedin@example.com, userloggedin@example.com',
          subject: `Product created ✔ ${content.id}`,
          text: 'Product created!',
          html: `<h1>Product ${content.name} created successfully!</h1> 
          <img src='${content.imageUrl}'/>
          <table>
          <tr><td>${content.id}</td></tr>
          <tr><td>${content.price}</td></tr>
          <tr><td>${content.description}</td></tr>
          </table>`,
        });

        console.log('Email sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    },
    { noAck: true }
  );
};
main();
