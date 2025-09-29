import { Injectable } from "@nestjs/common";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

@Injectable()
export class TrpcService {
    router = t.router({
        health: t.procedure.query(() => "OK"),
        addLog: t.procedure
            .input(z.object({ message: z.string() }))
            .mutation(async ({ input }) => {
                // later: call Drizzle ORM here
                return { success: true, message: input.message };
            }),
    });
}
