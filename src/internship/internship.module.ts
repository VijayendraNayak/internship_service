import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Internship } from './entities/internship.entity';
import { InternshipService } from './internship.service';
import { InternshipController } from './internship.controller';
import { InternshipEventsController } from './receive.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Internship])],
  controllers: [InternshipController,InternshipEventsController],
  providers: [InternshipService],
})
export class InternshipModule {}
