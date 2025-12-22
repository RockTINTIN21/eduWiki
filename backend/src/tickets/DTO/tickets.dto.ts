import {
  IsIn,
  IsJSON,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTicket {
  // @IsNotEmpty()
  // @IsUUID()
  // userId: string;

  @IsNotEmpty()
  @IsUUID()
  entityId: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['country', 'university', 'program'], {
    message: 'entity_type должен быть одним из: country, university, program',
  })
  entityType: string;

  // @IsNotEmpty()
  // @IsUUID()
  // reviewed_by: string;

  @IsNotEmpty()
  @IsObject()
  payload: string;
}
