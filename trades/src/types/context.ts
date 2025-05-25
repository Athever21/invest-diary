import { YogaInitialContext } from "graphql-yoga"

export type Context = YogaInitialContext & {
    user: {
        userId: string
        role?: string
    }
}

