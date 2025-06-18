import { ApiProperty } from '@nestjs/swagger';


export class CreateInternshipDto {
   @ApiProperty({ example: 'OpenAI' })
  company: string;
  @ApiProperty({ example: 'Frontend developer' })
  role: string;
  @ApiProperty({ example: '6 months' })
  duration: string;
  @ApiProperty({ example: 'Bangalore' })
  location: string;
}
