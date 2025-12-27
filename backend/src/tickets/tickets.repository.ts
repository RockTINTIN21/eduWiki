import { PrismaService } from '../prisma.service.js';
import { Injectable } from '@nestjs/common';
import { Ticket } from './types/user.entity.js';
import { UpdateTicket } from './DTO/tickets.dto.js';

@Injectable()
export class TicketsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllTickets() {
    return this.prisma.$queryRawUnsafe(`SELECT * FROM tickets`);
  }

  async getTicket(id: number) {
    const res: Ticket = await this.prisma.$queryRawUnsafe(
      `SELECT * FROM tickets WHERE id = $1`,
      id,
    );
    return res[0] ?? null;
  }

  createTicket(t: Ticket) {
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

  updateTicket(id: number, dto: UpdateTicket) {
    return this.prisma.ticket.update({
      where: { id },
      data: {
        ...(dto.statusId !== undefined && { status_id: dto.statusId }),
        ...(dto.payload !== undefined && { payload: dto.payload }),
        ...(dto.reviewedBy !== undefined && { reviewed_by: dto.reviewedBy }),
      },
    });
  }

  deleteTicket(id: number) {
    return this.prisma.$executeRawUnsafe(
      `DELETE FROM tickets WHERE id = ${id}`,
    );
  }
}
