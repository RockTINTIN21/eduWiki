import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProgramDTO {

  // @IsNotEmpty()
  // @IsString()

}

export type UpdateProgramDTO = Partial<CreateProgramDTO>