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
  // createProgram(DTO: CreateProgramDTO) {
  //   return this.repo.createProgram(DTO);
  // }
  //
  // updateProgram(DTO: UpdateProgramDTO) {
  //   return this.repo.updateProgram(DTO);
  // }
  //
  // deleteProgram(id: string) {
  //   return this.repo.updateProgram(id);
  // }
}
