import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { CreateTicket } from './DTO/tickets.dto.js';

@Controller('tickets')
@UseGuards(AuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('/')
  getTickets() {
    return this.ticketsService.getAllTickets();
  }

  @Post('/create')
  createTicket(@Req() req: Request, @Body() dto: CreateTicket) {
    return this.ticketsService.createTicket(req, dto);
  }
}
