import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InternshipService } from './internship.service';

@Controller()
export class InternshipEventsController {
  constructor(private readonly internshipService: InternshipService) {}

  @EventPattern('user_created')
  async handleUserCreated(@Payload() data: any) {
    console.log('Received user_created event:', data);

    try {
      // Create a default internship profile for the new user
      const defaultInternship = await this.internshipService.create({
        company: 'Not Assigned',
        role: 'Not Assigned',
        duration: 'Not Assigned',
        location: 'Not Assigned',
      });

      console.log('Created default internship profile:', defaultInternship);
    } catch (error) {
      console.error('Error creating default internship profile:', error);
    }
  }
}