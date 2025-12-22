import { PrismaService } from '../prisma.service.js';
import { Injectable } from '@nestjs/common';
import { Ticket } from './types/user.entity.js';

@Injectable()
export class TicketsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllTickets() {
    return this.prisma.$queryRawUnsafe(`SELECT * FROM Tickets`);
  }

  createTicket(t: Ticket) {
    console.log('TICKET:', t);
    return this.prisma.$queryRawUnsafe(
      `INSERT INTO tickets (
                     status_id, 
                     user_id, 
                     entity_type, 
                     entity_id, 
                     payload
      ) VALUES ($1, $2, $3, $4, $5)`,
      t.statusId,
      t.userId,
      t.entityType,
      t.entityId,
      t.payload,
    );
  }
}
