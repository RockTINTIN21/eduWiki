import { HandlerInput, TicketEntity } from '../types/tickets.entity';
import {
  AssertCreateArgs,
  AssertDeleteArgs,
  AssertUpdateArgs,
} from '../../countries/types/countries.business-rules.types';
import { HttpException } from '@nestjs/common';

export function uniqueEntityHandler(
  deps: {
    assertCountryCreate: (args: any) => Promise<any>;
    assertCountryUpdate: (args: any) => Promise<any>;
    assertCountryDelete: (args: any) => Promise<any>;
  },
  t: HandlerInput,
) {
  type HandlerArgs = {
    id?: string;
    payload?: unknown;
  };

  const handlers = {
    COUNTRY: {
      CREATE: async ({ payload }: HandlerArgs) => {
        return await deps.assertCountryCreate(payload as AssertCreateArgs);
      },
      UPDATE: async ({ payload, id }: HandlerArgs) => {
        const p = { payload, id } as AssertUpdateArgs;
        return await deps.assertCountryUpdate(p);
      },
      DELETE: async ({ id }: HandlerArgs) => {
        return await deps.assertCountryDelete({
          id,
        } as AssertDeleteArgs);
      },
    },
    UNIVERSITY: {
      CREATE: async () => {},
      UPDATE: async () => {},
      DELETE: async () => {},
    },
    PROGRAM: {
      CREATE: async () => {},
      UPDATE: async () => {},
      DELETE: async () => {},
    },
  } satisfies Record<
    TicketEntity['entityType'],
    Record<TicketEntity['entityAction'], (args: HandlerArgs) => any>
  >;
  try {
    return handlers[t.entityType][t.entityAction]({
      id: t.entityId,
      payload: t.payload,
    });
  } catch (e) {
    throw new HttpException(
      `Error while check unique for entityTicket. Error: ${e}`,
      500,
    );
  }
}
