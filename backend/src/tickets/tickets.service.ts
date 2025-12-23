import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository.js';
import { CreateTicket, UpdateTicket } from './DTO/tickets.dto.js';
import { CountriesService } from '../countries/countries.service.js';

@Injectable()
export class TicketsService {
  constructor(
    private readonly repo: TicketsRepository,
    private readonly countries: CountriesService,
  ) {}

  getAllTickets() {
    return this.repo.getAllTickets();
  }

  createTicket(payload: any, dto: CreateTicket) {
    const ticket: CreateTicket = {
      ...dto,
      statusId: 1,
      userId: payload.user.id,
    };

    return this.repo.createTicket(ticket);
  }

  async updateTicket(payload: any, dto: UpdateTicket, id: number) {
    console.log('dto:', dto);
    if (
      dto.statusId &&
      payload.user.id === '75c3e01e-f788-450b-81c7-baafe9e5e3f3'
    ) {
      await this.repo.updateTicket(id, {
        ...(dto.payload && { payload: dto.payload }),
        statusId: dto.statusId,
        reviewedBy: payload.user.id,
      });

      if (dto.statusId === 3) {
        console.log('STARTING UPDATE TICKET:', dto);
        const ticket = await this.repo.getTicket(id);
        console.log('TICKET FROM DB:', ticket.entity_type);
        if (ticket.entity_type === 'country') {
          const res = await this.countries.updateCountry(
            ticket.entity_id,
            ticket.payload,
          );
          console.log('res:', res);
        }
      }
    } else if (
      dto.statusId &&
      payload.user.id !== '75c3e01e-f788-450b-81c7-baafe9e5e3f3'
    ) {
      throw new HttpException(
        'You dont have permission to update status ticket',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return this.repo.updateTicket(id, { payload: dto.payload });
    }
  }

  deleteTicket(id: number) {
    return this.repo.deleteTicket(id);
  }
}
