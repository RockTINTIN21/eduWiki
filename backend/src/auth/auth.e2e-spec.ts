import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '../prisma.service';
import { AppModule } from '../app.module';
import { RegisterDTO } from './DTO/auth.dto';

describe('Auth', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppModule)
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('/CREATE user', async () => {
    const registerData: RegisterDTO = {
      email: 'sashalexjr@gmail.com',
      password: '77599557609$Ww',
      passwordConfirm: '77599557609$Ww',
      username: 'RockTINTIN21',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerData);

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
});
