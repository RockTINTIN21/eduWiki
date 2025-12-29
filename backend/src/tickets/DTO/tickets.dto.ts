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
  @IsOptional()
  entityId?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['country', 'university', 'program'], {
    message: 'entityType должен быть одним из: country, university, program',
  })
  entityType: 'country' | 'university' | 'program';

  @IsOptional()
  @IsObject()
  payload?: object;

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

  @IsNotEmpty()
  @IsString()
  @IsIn(['CREATE', 'UPDATE', 'DELETE'], {
    message: 'entityAction должен быть одним из: CREATE, UPDATE, DELETE',
  })
  entityAction: 'CREATE' | 'UPDATE' | 'DELETE';
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
