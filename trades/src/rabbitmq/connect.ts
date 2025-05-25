import amqplib, { Channel } from 'amqplib';
import { Queues } from './messages';

let channel: Channel;

export const getChannel = async() => {
    if (channel) return channel;

    const conn = await amqplib.connect(process.env.RABBITMQ_URL as string)
    channel = await conn.createChannel();

    channel.assertExchange(Queues.AUTH, 'direct', { durable: true });
    channel.assertQueue(Queues.AUTH, { durable: true });
    channel.bindQueue(Queues.AUTH, Queues.AUTH, 'auth.verify');

    return channel;
}