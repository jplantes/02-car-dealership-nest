import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
// Pipe a nivel de clase
// @UsePipes( ValidationPipe )
export class CarsController {

  constructor(
    private readonly carsServ: CarsService,
  ){}


  @Get()
  getAllCars() {
    return this.carsServ.findAll();
  }

  @Get('/:id')
  getCarById(
    // Pipe para cambiar el tipo de dato -> ParseIntPipe
    // @Param( 'id', ParseIntPipe ) id: number
    @Param( 'id', new ParseUUIDPipe({ version: '4'}) ) id: string
  ) {

    return this.carsServ.findById( id );
  }

  @Post()
  postCreateCar(
    @Body() createCarDto: CreateCarDto
  ) {
    return this.carsServ.create( createCarDto );
  }

  @Patch('/:id')
  patchCar(
    @Param( 'id', ParseUUIDPipe ) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsServ.update( id, updateCarDto );
  }

  @Delete('/:id')
  deleteCar(
    @Param( 'id', ParseUUIDPipe ) id: string,
  ) {
    return this.carsServ.delete( id );
  }
}
