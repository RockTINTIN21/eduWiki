import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Ticket } from './types/user.entity';
import { CreateTicket, UpdateTicket } from './DTO/tickets.dto';

@Injectable()
export class TicketsRepo {
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

  createTicket(t: CreateTicket) {
    return this.prisma.ticket.create({
      data: {
        statusId: t.statusId,
        userId: t.userId,
        entityType: t.entityType,
        payload: t.payload,
        entityAction: t.entityAction,
      },
      select: {
        id: true,
      },
    });
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
