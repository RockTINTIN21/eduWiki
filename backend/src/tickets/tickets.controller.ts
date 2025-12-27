import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTicket, UpdateTicket } from './DTO/tickets.dto';

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

  @Patch('/update/:id')
  updateTicket(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() dto: UpdateTicket,
  ) {
    return this.ticketsService.updateTicket(req, dto, id);
  }

  @Delete('/delete/:id')
  deleteTicket(@Param('id') id: number) {
    return this.ticketsService.deleteTicket(id);
  }
}
