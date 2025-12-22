export interface Ticket {
  statusId: 1 | 2 | 3;
  userId: string;
  entityId: string;
  entityType: string;
  payload: string;
}
