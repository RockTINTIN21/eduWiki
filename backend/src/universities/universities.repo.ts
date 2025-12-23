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
    const university = await this.prisma.universities.create({
      data: {
        name: dto.name,
        description: dto.description,
        country_id: dto.countryId,
        created_by: dto.createdBy,
        bg_image: dto.bgImage,
      },
    });
    console.log('UNIVERTSITY:', university);
    if (dto.information) {
      await this.prisma.universities_information.create({
        data: {
          university_id: university.id,
          top: dto.information.top,
          city: dto.information.city,
          students: dto.information.students,
          year_of_foundation: dto.information.yearOfFoundation,
        },
      });
    }

    if (dto.requirements) {
      await this.prisma.universities_requirements.create({
        data: {
          university_id: university.id,
          language_level: dto.requirements.languageLevel,
          documents: dto.requirements.documents,
          deadline: dto.requirements.deadline,
        },
      });
    }
  }

  async updateUniversity(id: string, dto: UpdateUniversityDTO) {
    await this.prisma.universities.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        description: dto.description,
        bg_image: dto.bgImage,
      },
    });

    if (dto.information) {
      await this.prisma.universities_information.update({
        where: {
          university_id: id,
        },
        data: {
          top: dto.information.top,
          city: dto.information.city,
          students: dto.information.students,
          year_of_foundation: dto.information.yearOfFoundation,
        },
      });
    }

    if (dto.requirements) {
      await this.prisma.universities_requirements.update({
        where: {
          university_id: id,
        },
        data: {
          language_level: dto.requirements.languageLevel,
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
