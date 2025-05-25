import { sendRpcMessage } from "../rabbitmq/sendMessage"
import { YogaInitialContext } from "graphql-yoga"
import { MessagePatterns, Queues } from "../rabbitmq/messages";


export const createContext = async({ request }: YogaInitialContext) => {
    const auth = request.headers.get('Authorization');

    if (!auth || !auth.startsWith("Bearer ")) return {};

    const token = auth.split(" ")[1];

    const { user } = await sendRpcMessage(Queues.AUTH, MessagePatterns.AUTH_VERIFY, { token }) as any;

    return user ? { user } : {};
}