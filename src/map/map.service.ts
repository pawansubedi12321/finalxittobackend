import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import axios from 'axios';

@Injectable()
export class MapService {
  create(createMapDto: CreateMapDto) {
    return 'This action adds a new map';
  }

  async  reverseCoding(query: any) {
    try {
      let response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${query.lat}&lon=${query.long}`);
      if(response.data.address.country_code == "np"){
       return {
        "address": response.data["display_name"],
       }
      }else{
        return {
          "address": null,
         }
      }
   
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} map`;
  }

  update(id: number, updateMapDto: UpdateMapDto) {
    return `This action updates a #${id} map`;
  }

  remove(id: number) {
    return `This action removes a #${id} map`;
  }
}
