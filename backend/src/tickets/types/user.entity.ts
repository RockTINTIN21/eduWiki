export interface Ticket {
  statusId: number;
  userId: string;
  entityType: string;
  payload: object;
  reviewedBy: string;
  entityAction: string;
}
