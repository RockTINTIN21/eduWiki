import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDTO } from './DTO/universities.dto';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get('/')
  getAllUniversities() {
    return this.universitiesService.getAllUniversities();
  }

  @Get('/:id')
  getUniversity(@Param('id') id: string) {
    return this.universitiesService.getUniversity(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/create')
  createUniversity(@Body() dto: CreateUniversityDTO) {
    return this.universitiesService.createUniversity(dto);
  }
}
