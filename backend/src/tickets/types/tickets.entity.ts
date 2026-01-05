export type TicketEntityType = 'COUNTRY' | 'UNIVERSITY' | 'PROGRAM';
export type TicketEntityAction = 'CREATE' | 'UPDATE' | 'DELETE';
export type TicketStatusName = 'OPEN' | 'APPROVED' | 'REJECTED';

export type TicketEntity = {
  entityId?: string;
  entityType: TicketEntityType;
  payload?: object;
  entityAction: TicketEntityAction;
  statusName: TicketStatusName;
  userId: string;
};

export type HandlerInput = {
  entityType: TicketEntityType;
  entityAction: TicketEntityAction;
  entityId?: string;
  payload?: object;
};
