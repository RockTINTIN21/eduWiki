import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TicketsRepo } from './repo/tickets.repo';
import { CreateTicketDTO, UpdateTicketDTO } from './dto/tickets.dto';
import { CountriesService } from '../countries/countries.service';
import { HandlerInput } from './types/tickets.entity';
import { CountryBusinessRules } from '../countries/rules/country.business-rules';
import { uniqueEntityHandler } from './handlers/unique-entity.handler';
import { updateEntityHandler } from './handlers/update-entity.handler';
import { UsersService } from '../users/users.service';

@Injectable()
export class TicketsService {
  constructor(
    private readonly repo: TicketsRepo,
    private readonly users: UsersService,
    private readonly countries: CountriesService,
    private readonly countriesRules: CountryBusinessRules,
  ) {}

  getAllTickets() {
    return this.repo.getAllTickets();
  }

  private async checkEntityUnique(t: HandlerInput) {
    return await uniqueEntityHandler(
      {
        assertCountryCreate: this.countriesRules.assertCreate.bind(
          this.countriesRules,
        ),
        assertCountryUpdate: this.countriesRules.assertUpdate.bind(
          this.countriesRules,
        ),
        assertCountryDelete: this.countriesRules.assertDelete.bind(
          this.countriesRules,
        ),
      },
      t,
    );
  }

  private async updateEntityByTicket(t: HandlerInput) {
    return updateEntityHandler(
      {
        countryCreate: this.countries.createCountry.bind(this.countries),
        countryUpdate: this.countries.updateCountry.bind(this.countries),
        countryDelete: this.countries.deleteCountry.bind(this.countries),
      },
      t,
    );
  }

  async createTicket(payload: any, dto: CreateTicketDTO) {
    // const userRoles = await this.users.getUserRoles(payload.user.id as string);
    //

    const user = await this.users.findById(payload.user.id as string);

    const isAdmin = user.role.name === 'ADMIN' || user.role.name === 'OWNER';

    // const isAdmin = userRoles.some(
    //   ({ role }) => role.name === 'ADMIN' || role.name === 'OWNER',
    // );

    const handlerData: HandlerInput = {
      entityAction: dto.entityAction,
      entityType: dto.entityType,
      entityId: dto.entityId,
      payload: dto.payload,
    };

    await this.checkEntityUnique(handlerData);

    if (dto.entityAction !== 'CREATE') {
      if (dto.entityId) {
        await this.repo.createTicket({
          ...dto,
          entityId: dto.entityId,
          statusName: isAdmin ? 'APPROVED' : 'OPEN',
          userId: payload.user.id,
        });
      } else {
        throw new HttpException(
          'Cannot find entity with this id',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      await this.repo.createTicket({
        ...dto,
        statusName: isAdmin ? 'APPROVED' : 'OPEN',
        userId: payload.user.id,
      });
    }

    if (isAdmin) {
      await this.updateEntityByTicket(handlerData);
    }
  }

  async updateTicket(payload: any, dto: UpdateTicketDTO, id: number) {
    const ticket = await this.repo.getTicket(id);

    const user = await this.users.findById(payload.user.id as string);

    const isModerator = ['OWNER', 'ADMIN', 'MODERATOR'].includes(
      user.role.name,
    );

    if (ticket?.userId !== payload.user.id && !isModerator) {
      throw new HttpException(
        'You dont have permission to update this ticket',
        HttpStatus.FORBIDDEN,
      );
    }

    if (dto.status) {
      if (isModerator) {
        const ticket = await this.repo.updateTicket({
          id: id,
          reviewedBy: payload.user.id,
          payload: dto.payload,
          statusName: dto.status,
        });
        if (dto.status === 'APPROVED' && ticket.payload) {
          return this.updateEntityByTicket({
            entityType: ticket.entityType,
            entityAction: ticket.entityAction,
            entityId: ticket.entityId || undefined,
            payload: ticket.payload as object,
          });
        }
      } else {
        throw new HttpException(
          'You dont have permission to update status ticket',
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      return this.repo.updateTicket({
        id: id,
        payload: dto.payload,
      });
    }
  }

  deleteTicket(id: number) {
    return this.repo.deleteTicket(id);
  }
}
