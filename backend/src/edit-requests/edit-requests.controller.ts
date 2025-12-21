import { Controller, UseGuards } from '@nestjs/common';
import { EditRequestsService } from './edit-requests.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('edit-requests')
@UseGuards(AuthGuard)
export class EditRequestsController {
  constructor(private readonly editRequestsService: EditRequestsService) {}
}
