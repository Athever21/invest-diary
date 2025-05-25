import { getChannel } from "./connect"
import { v4 as uuidv4 } from 'uuid';

export const sendRpcMessage = async(queue: string, pattern: string, message: any) => {
    const channel = await getChannel();
    const correlationId = uuidv4();

    const replayQueue = await channel.assertQueue('', { exclusive: true });

    return new Promise((resolve) => {
        channel.consume(replayQueue.queue, (msg) => {
            if (msg?.properties.correlationId == correlationId) resolve(JSON.parse(msg.content.toString()));
        }, { noAck: true });

        channel.publish(queue, pattern, Buffer.from(JSON.stringify(message)), {
            replyTo: replayQueue.queue,
            correlationId
        });
    });
}