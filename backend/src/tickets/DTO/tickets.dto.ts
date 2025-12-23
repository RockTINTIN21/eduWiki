import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTicket {
  @IsNotEmpty()
  @IsUUID()
  entityId: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['country', 'university', 'program'], {
    message: 'entity_type должен быть одним из: country, university, program',
  })
  entityType: string;

  @IsNotEmpty()
  @IsObject()
  payload: object;

  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3])
  statusId: number;

  @IsOptional()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  reviewedBy: string;
}

export class UpdateTicket {
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3])
  statusId?: number;

  @IsOptional()
  @IsUUID()
  entityId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  reviewedBy?: string;

  @IsOptional()
  @IsObject()
  payload?: object;
}
