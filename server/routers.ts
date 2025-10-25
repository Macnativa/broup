import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createAppointment, getAppointments } from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  appointments: router({
    create: publicProcedure
      .input(z.object({
        clientName: z.string().min(1),
        clientEmail: z.string().email(),
        clientPhone: z.string().min(1),
        serviceType: z.string().min(1),
        serviceDescription: z.string().optional(),
        address: z.string().min(1),
        appointmentDate: z.date(),
        appointmentTime: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return createAppointment({
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          clientPhone: input.clientPhone,
          serviceType: input.serviceType,
          serviceDescription: input.serviceDescription,
          address: input.address,
          appointmentDate: input.appointmentDate,
          appointmentTime: input.appointmentTime,
          status: 'pendente',
        });
      }),
    list: publicProcedure.query(async () => {
      return getAppointments();
    }),
  }),
});

export type AppRouter = typeof appRouter;

