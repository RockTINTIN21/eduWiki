import { Controller } from '@nestjs/common';
import { UniversitiesService } from './universities.service.js';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}
}
