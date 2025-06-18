import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { InternshipService } from "./internship.service";
import { CreateInternshipDto } from "./dto/create-internship.dto";
import { UpdateInternshipDto } from "./dto/update-internship.dto";
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('internships')
@Controller('internship')
export class InternshipController{
    constructor(private readonly internshipService: InternshipService){}

    @Post()
    @ApiOperation({ summary: 'Create a new internship' })
    create(@Body()dto:CreateInternshipDto){
        return this.internshipService.create(dto);
    }
    @Get()
    @ApiOperation({ summary: 'Get all internships' })
    findAll(){
        return this.internshipService.findAll();
    }
    @ApiOperation({ summary: 'Get an internship by id' })
    @Get(':id')
    findOne(@Param('id')id:string){
        return this.internshipService.findOne(id)
    }
    @ApiOperation({ summary: 'Update an internship' })
    @Patch(':id')
    update(@Param('id')id:string, @Body()dto:UpdateInternshipDto){
        return this.internshipService.update(id,dto)
    }
    @ApiOperation({ summary: 'Delete an internship' })
    @Delete(':id')
    remove(@Param('id')id:string){
        return this.internshipService.remove(id)
    }

}