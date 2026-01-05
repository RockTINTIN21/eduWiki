import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TicketStatusName } from '../types/tickets.entity';

export class CreateTicketDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsUUID()
  entityId?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['COUNTRY', 'UNIVERSITY', 'PROGRAM'], {
    message: 'entityType должен быть одним из: country, university, program',
  })
  entityType: 'COUNTRY' | 'UNIVERSITY' | 'PROGRAM';

  @IsOptional()
  @IsObject()
  payload?: object;

  @IsNotEmpty()
  @IsString()
  @IsIn(['CREATE', 'UPDATE', 'DELETE'], {
    message: 'entityAction должен быть одним из: CREATE, UPDATE, DELETE',
  })
  entityAction: 'CREATE' | 'UPDATE' | 'DELETE';
}

export class UpdateTicketDTO {
  @IsOptional()
  @IsString()
  @IsIn(['OPEN', 'APPROVED', 'REJECTED'])
  status?: TicketStatusName;

  @IsOptional()
  @IsObject()
  payload?: object;
}
