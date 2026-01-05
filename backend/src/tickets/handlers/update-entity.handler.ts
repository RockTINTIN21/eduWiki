import { HandlerInput } from '../types/tickets.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  CreateCountryDto,
  UpdateCountryDto,
} from '../../countries/DTO/countries.dto';

export function updateEntityHandler(
  deps: {
    countryCreate: (args: any) => Promise<any>;
    countryUpdate: (args: any) => Promise<any>;
    countryDelete: (args: any) => Promise<any>;
  },
  t: HandlerInput,
) {
  type HandlerArgs = {
    id?: string;
    p?: unknown;
  };

  function requireId<T>(args: HandlerArgs) {
    if (!args.id)
      throw new HttpException(
        'Id is required for this action',
        HttpStatus.BAD_REQUEST,
      );

    return args.id as T;
  }

  function requirePayload<T>(args: HandlerArgs) {
    if (!args.p)
      throw new HttpException(
        'Payload is required for this action',
        HttpStatus.BAD_REQUEST,
      );
    return args.p as T;
  }

  const handlers = {
    COUNTRY: {
      CREATE: ({ p }: HandlerArgs) => {
        const payload = requirePayload<CreateCountryDto>({ p });
        return deps.countryCreate({ dto: payload });
      },
      UPDATE: (args: HandlerArgs) => {
        const payload = requirePayload<UpdateCountryDto>(args);
        const id = requireId<string>(args);
        return deps.countryUpdate({ id, dto: payload });
      },
      DELETE: ({ id }: HandlerArgs) => {
        const data = requireId<string>({ id });
        return deps.countryDelete({ id: data });
      },
    },
    UNIVERSITY: {
      CREATE: () => {},
      UPDATE: () => {},
      DELETE: () => {},
    },
    PROGRAM: {
      CREATE: () => {},
      UPDATE: () => {},
      DELETE: () => {},
    },
  } satisfies Record<
    HandlerInput['entityType'],
    Record<HandlerInput['entityAction'], (args: HandlerArgs) => any>
  >;

  try {
    return handlers[t.entityType][t.entityAction]({
      id: t.entityId,
      p: t.payload,
    });
  } catch (e) {
    throw new HttpException(
      `Error while update entityTicket. Error: ${e}`,
      500,
    );
  }
}
