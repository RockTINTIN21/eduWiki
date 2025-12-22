import { Injectable } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository.js';
import { CreateTicket } from './DTO/tickets.dto.js';
import { Ticket } from './types/user.entity.js';

@Injectable()
export class TicketsService {
  constructor(private readonly repo: TicketsRepository) {}

  getAllTickets() {
    return this.repo.getAllTickets();
  }

  createTicket(payload: any, dto: CreateTicket) {
    console.log('req:', payload.user);
    console.log('dto:', dto);

    const ticket: Ticket = {
      ...dto,
      statusId: 1,
      userId: payload.user.id,
    };

    return this.repo.createTicket(ticket);
  }
}
