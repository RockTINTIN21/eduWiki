import { Injectable } from '@nestjs/common';
import { ProgramsRepo } from './programs.repo';

@Injectable()
export class ProgramsService {
  constructor(private readonly repo: ProgramsRepo) {}

  // getAllPrograms() {
  //   return this.repo.getAllPrograms();
  // }
  //
  // getProgram(id: string) {
  //   return this.repo.getProgram(id);
  // }
  //
  // createProgram(dto: CreateProgramDTO) {
  //   return this.repo.createProgram(dto);
  // }
  //
  // updateProgram(dto: UpdateProgramDTO) {
  //   return this.repo.updateProgram(dto);
  // }
  //
  // deleteProgram(id: string) {
  //   return this.repo.updateProgram(id);
  // }
}
