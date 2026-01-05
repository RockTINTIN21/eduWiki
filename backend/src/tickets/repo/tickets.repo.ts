import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateTicketRepoInput,
  UpdateTicketRepoInput,
} from './tickets.repo.types';

@Injectable()
export class TicketsRepo {
  constructor(private readonly prisma: PrismaService) {}

  getAllTickets() {
    return this.prisma.ticket.findMany();
  }

  async getTicket(id: number) {
    return this.prisma.ticket.findUnique({ where: { id } });
  }

  createTicket(t: CreateTicketRepoInput) {
    return this.prisma.ticket.create({
      data: {
        status: {
          connect: { statusName: t.statusName },
        },
        user: {
          connect: { id: t.userId },
        },
        entityType: t.entityType,
        payload: t.payload,
        entityAction: t.entityAction,
        entityId: t.entityId,
      },
      select: {
        id: true,
      },
    });
  }

  updateTicket(t: UpdateTicketRepoInput) {
    return this.prisma.ticket.update({
      where: { id: t.id },
      data: {
        status: {
          connect: { statusName: t.statusName },
        },
        payload: t.payload,
        reviewedBy: t.reviewedBy,
      },
    });
  }

  deleteTicket(id: number) {
    return this.prisma.ticket.delete({ where: { id: id } });
  }
}
