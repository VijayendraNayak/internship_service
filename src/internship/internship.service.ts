import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Internship } from './entities/internship.entity';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { UpdateInternshipDto } from './dto/update-internship.dto';
import { publishInternshipCompleted } from './publisher';

@Injectable()
export class InternshipService {
  constructor(
    @InjectRepository(Internship)
    private readonly internshipRepo: Repository<Internship>,
  ) {}

  // Create a new internship
  async create(dto: CreateInternshipDto): Promise<Internship> {
    try {
      const internship = this.internshipRepo.create(dto);
      await publishInternshipCompleted({
        id: internship.id,
        company: internship.company,
        role: internship.role,
        duration: internship.duration,
        location: internship.location,
      });
      return await this.internshipRepo.save(internship);
    } catch (error) {
      throw new BadRequestException(
        'Failed to create internship: ' + error.message,
      );
    }
  }

  // Find all internships
  async findAll(): Promise<Internship[]> {
    try {
      return await this.internshipRepo.find();
    } catch (error) {
      throw new BadRequestException(
        'Failed to fetch internships: ' + error.message,
      );
    }
  }

  // Find internship by ID
  async findOne(id: string): Promise<Internship> {
    try {
      const internship = await this.internshipRepo.findOne({
        where: { id },
      });

      if (!internship) {
        throw new NotFoundException(`Internship with ID ${id} not found`);
      }

      return internship;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to fetch internship: ' + error.message,
      );
    }
  }

  // Update internship (PATCH)
  async update(id: string, dto: UpdateInternshipDto): Promise<Internship> {
    try {
      // Check if internship exists
      const existingInternship = await this.internshipRepo.findOne({
        where: { id },
      });

      if (!existingInternship) {
        throw new NotFoundException(`Internship with ID ${id} not found`);
      }

      await this.internshipRepo.update(id, dto);

      const updatedInternship = await this.internshipRepo.findOne({
        where: { id },
      });
      if (!updatedInternship)
        throw new NotFoundException(
          `Failed to fetch the updated data of the interhsip with if:${id}`,
        );

      return updatedInternship;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to update internship: ' + error.message,
      );
    }
  }

  // Delete internship (soft delete if configured, otherwise hard delete)
  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    try {
      // Check if internship exists
      const internship = await this.findOne(id);

      if (!internship)
        throw new NotFoundException(`Internship with ${id} not found`);

      // Delete the internship
      await this.internshipRepo.delete(id);

      return {
        message: 'Internship deleted successfully',
        deletedId: id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to delete internship: ' + error.message,
      );
    }
  }
}
