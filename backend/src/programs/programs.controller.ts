import { Controller } from '@nestjs/common';
import { ProgramsService } from './programs.service';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  // @Get('/')
  // getAllPrograms() {
  //   return this.programsService.getAllPrograms();
  // }
  //
  // @Get('/:id')
  // getProgram(@Param('id') id: string) {
  //   return this.programsService.getProgram(id);
  // }
}
