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
import { CreateTicketDTO, UpdateTicketDTO } from './DTO/tickets.dto';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';

@Controller('tickets')
@UseGuards(AccessTokenGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('')
  getTickets() {
    return this.ticketsService.getAllTickets();
  }

  @Post('')
  createTicket(@Req() req: Request, @Body() dto: CreateTicketDTO) {
    return this.ticketsService.createTicket(req, dto);
  }

  @Patch(':id')
  updateTicket(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() dto: UpdateTicketDTO,
  ) {
    return this.ticketsService.updateTicket(req, dto, id);
  }

  @Delete(':id')
  deleteTicket(@Param('id') id: number) {
    return this.ticketsService.deleteTicket(id);
  }
}
