import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model:'Corolla'
    // },
  ];


  findAll() {
    return this.cars;
  }

  findById( id: string ) {
    const car = this.cars.filter( c => c.id === id )

    // Cambiar el tipo de excepción que retorna
    if ( !car ) throw new NotFoundException(`No existe el auto con el ID ${ id }`);

    return car;
  }

  create( createCarDto: CreateCarDto ) {
    const newCar = {
      ...createCarDto,
      id: uuid()
    };

    this.cars.push( newCar );

    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {

    let carDB = this.findById( id );

    this.cars = this.cars.map( car => {
      if ( car.id === id ) {
        carDB[0] = { ...carDB[0], ...updateCarDto }
        return carDB[0];
      }
      return car;
    })

    return carDB;
  }

  delete( id: string ) {
    const car = this.findById( id );

    this.cars = this.cars.filter( car => car.id !== id );
  }


  fillCarsWithSeedData( cars: Car[] ) {
    this.cars = cars;
  }
}
