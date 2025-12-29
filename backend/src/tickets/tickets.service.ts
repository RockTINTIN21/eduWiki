import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TicketsRepo } from './tickets.repo';
import { CreateTicket, UpdateTicket } from './DTO/tickets.dto';
import { CountriesService } from '../countries/countries.service';
import { UniversitiesService } from '../universities/universities.service';
import { UsersRepo } from '../users/users.repo';
import { CreateCountryDto } from '../countries/DTO/countries.dto';
import { CreateUniversityDTO } from '../universities/DTO/universities.dto';

@Injectable()
export class TicketsService {
  constructor(
    private readonly repo: TicketsRepo,
    private readonly usersRepo: UsersRepo,
    private readonly countries: CountriesService,
    private readonly universities: UniversitiesService,
  ) {}

  async updateEntityByTicket(
    entityAction: 'CREATE' | 'UPDATE' | 'DELETE',
    entityType: 'country' | 'university' | 'program',
    payload?: object,
    entityId?: string,
  ) {
    if (entityType === 'country') {
      if (entityAction === 'CREATE') {
        return await this.countries.addCountry(payload as CreateCountryDto);
      }
      if (entityAction === 'UPDATE' && entityId && payload) {
        return await this.countries.updateCountry(entityId, payload);
      }
      if (entityAction === 'DELETE' && entityId) {
        return await this.countries.deleteCountry(entityId);
      }
    }

    if (entityType === 'university') {
      if (entityAction === 'CREATE') {
        return await this.universities.createUniversity(
          payload as CreateUniversityDTO,
        );
      }
      if (entityAction === 'UPDATE' && entityId && payload) {
        return await this.universities.updateUniversity(entityId, payload);
      }
      if (entityAction === 'DELETE' && entityId) {
        return this.universities.deleteUniversity(entityId);
      }
    }

    throw new HttpException(
      'Cannot find entityAction or EntityType',
      HttpStatus.NOT_FOUND,
    );
  }

  getAllTickets() {
    return this.repo.getAllTickets();
  }

  async createTicket(payload: any, dto: CreateTicket) {
    const userRoles = await this.usersRepo.getUserRoles(
      payload.user.id as string,
    );

    const isAdmin = userRoles.findIndex(
      (role) => role.roleId === 1 || role.roleId === 2,
    );

    const ticket: CreateTicket = {
      ...dto,
      statusId: isAdmin ? 3 : 1,
      userId: payload.user.id,
    };

    await this.repo.createTicket(ticket);
    if (isAdmin) {
      await this.updateEntityByTicket(
        ticket.entityAction,
        ticket.entityType,
        ticket.payload,
        ticket.entityId,
      );
    }
  }

  async updateTicket(payload: any, dto: UpdateTicket, id: number) {
    const userRoles = await this.usersRepo.getUserRoles(
      payload.user.id as string,
    );

    const isModerator = userRoles.findIndex((role) =>
      [2, 3, 4].includes(role.roleId),
    );

    if (isModerator) {
      const ticket = await this.repo.updateTicket(id, {
        ...(dto.payload && { payload: dto.payload }),
        statusId: dto.statusId,
        reviewedBy: payload.user.id,
      });

      if (dto.statusId === 2 && ticket.payload && ticket.entityId)
        await this.updateEntityByTicket(
          'UPDATE',
          ticket.entityType as 'country' | 'university' | 'program',
          ticket.payload as object,
          ticket.entityId,
        );
    } else if (
      dto.statusId &&
      userRoles.findIndex(
        (role) => role.roleId === 2 || role.roleId === 3 || role.roleId === 4,
      )
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
