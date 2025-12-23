import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TicketsModule } from './tickets/tickets.module.js';
import { ProgramsModule } from './programs/programs.module.js';
import { UniversitiesModule } from './universities/universities.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CountriesModule,
    UsersModule,
    AuthModule,
    TicketsModule,
    ProgramsModule,
    UniversitiesModule,
  ],
})
export class AppModule {}
