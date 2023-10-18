import { Injectable } from '@nestjs/common';

import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';


import { CARD_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly carServ: CarsService,
    private readonly brandServ: BrandsService,
  ){}

  populateDB() {

    this.carServ.fillCarsWithSeedData( CARD_SEED );
    this.brandServ.fillBrandsWithSeedData( BRANDS_SEED );
    
    return 'SEED ejecutado';
  }
}
