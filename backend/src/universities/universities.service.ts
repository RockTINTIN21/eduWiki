import { Injectable } from '@nestjs/common';
import { UniversitiesRepo } from './universities.repo.js';
import {
  CreateUniversityDTO,
  UpdateUniversityDTO,
} from './DTO/universities.dto.js';

@Injectable()
export class UniversitiesService {
  constructor(private readonly repo: UniversitiesRepo) {}

  getAllUniversities() {
    return this.repo.getAllUniversities();
  }

  getUniversity(id: string) {
    return this.repo.getUniversity(id);
  }

  createUniversity(dto: CreateUniversityDTO) {
    return this.repo.createUniversity(dto);
  }

  updateUniversity(id: string, dto: UpdateUniversityDTO) {
    return this.repo.updateUniversity(id, dto);
  }

  deleteUniversity(id: string) {
    return this.repo.deleteUniversity(id);
  }
}
