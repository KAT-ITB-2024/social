import { z } from 'zod';
import { createEvent } from '../helper';
import { type UserQueue } from '~/types/payloads/message';

export const findMatchEvent = createEvent(
  {
    name: 'findMatch',
    input: z.object({}),
    authRequired: true,
  },
  async ({ ctx, input }) => {
    if (ctx.client.data.matchQueue) {
      return;
    }
    const userSession = ctx.client.data.session;
    const userQueue: UserQueue = {
      userid: userSession.user.id,
    };

    // const matchResult = await findmat
  },
);
