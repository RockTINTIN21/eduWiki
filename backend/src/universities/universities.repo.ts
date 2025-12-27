import { PrismaService } from '../prisma.service.js';
import { Injectable } from '@nestjs/common';
import {
  CreateUniversityDTO,
  UpdateUniversityDTO,
} from './DTO/universities.dto.js';

@Injectable()
export class UniversitiesRepo {
  constructor(private readonly prisma: PrismaService) {}

  getAllUniversities() {
    return this.prisma.$queryRawUnsafe(`
      SELECT * 
      FROM universities
       JOIN universities_information 
         ON universities.id = universities_information.university_id
      JOIN universities_requirements 
        ON universities.id = universities_requirements.university_id
    `);
  }

  getUniversity(id: string) {
    return this.prisma.$queryRawUnsafe(
      `SELECT * FROM universities WHERE id = $1`,
      id,
    );
  }

  async createUniversity(dto: CreateUniversityDTO) {
    console.log('DTO:', dto);
    const university = await this.prisma.university.create({
      data: {
        name: dto.name,
        description: dto.description,
        countryId: dto.countryId,
        createdBy: dto.createdBy,
        bgImage: dto.bgImage,
      },
    });
    console.log('UNIVERTSITY:', university);
    if (dto.information) {
      await this.prisma.universityInformation.create({
        data: {
          universityId: university.id,
          top: dto.information.top,
          city: dto.information.city,
          students: dto.information.students,
          yearOfFoundation: dto.information.yearOfFoundation,
        },
      });
    }

    if (dto.requirements) {
      await this.prisma.universityRequirements.create({
        data: {
          universityId: university.id,
          languageLevel: dto.requirements.languageLevel,
          documents: dto.requirements.documents,
          deadline: dto.requirements.deadline,
        },
      });
    }
  }

  async updateUniversity(id: string, dto: UpdateUniversityDTO) {
    await this.prisma.university.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        description: dto.description,
        bgImage: dto.bgImage,
      },
    });

    if (dto.information) {
      await this.prisma.universityInformation.update({
        where: {
          universityId: id,
        },
        data: {
          top: dto.information.top,
          city: dto.information.city,
          students: dto.information.students,
          yearOfFoundation: dto.information.yearOfFoundation,
        },
      });
    }

    if (dto.requirements) {
      await this.prisma.universityRequirements.update({
        where: {
          universityId: id,
        },
        data: {
          languageLevel: dto.requirements.languageLevel,
          documents: dto.requirements.documents,
          deadline: dto.requirements.deadline,
        },
      });
    }
  }

  async deleteUniversity(id: string) {
    return this.prisma.$executeRawUnsafe(
      `DELETE FROM universities WHERE id = $1`,
      id,
    );
  }
}
