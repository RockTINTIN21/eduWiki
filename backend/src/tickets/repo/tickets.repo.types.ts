import {
  TicketEntityAction,
  TicketEntityType,
  TicketStatusName,
} from '../types/tickets.entity';

export type CreateTicketRepoInput = {
  entityId?: string;
  entityType: TicketEntityType;
  payload?: object;
  entityAction: TicketEntityAction;
  statusName: TicketStatusName;
  userId: string;
};

export interface UpdateTicketRepoInput {
  id: number;
  statusName?: TicketStatusName;
  payload?: object;
  reviewedBy?: string;
}
