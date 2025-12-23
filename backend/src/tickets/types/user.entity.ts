export interface Ticket {
  statusId: number;
  userId: string;
  entityId: string;
  entityType: string;
  payload: string;
  reviewedBy: string;
}
