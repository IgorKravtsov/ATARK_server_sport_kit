import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Region } from "./region.entity";
import { getRepository, Repository } from "typeorm";
import { UserRoles } from "../user/types/userRoles.enum";
import { CreateRegionDto } from "./DTO/region.create.dto";
import { User } from "../user/user.entity";

@Injectable()
export class RegionService {
  constructor(@InjectRepository(Region) private readonly regionRepository: Repository<Region>) {}

  async getAllRegionsWithTrainers(): Promise<Region[]> {
    const regions = await Region.find({relations: ['users']});
    // const trainers = regions.filter(region => region.users.filter(user => user.))

    return regions.filter(region => region.users.filter(user => user.role === UserRoles.TRAINER).length > 0)
  }

  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = Region.create()

    Object.assign(region, createRegionDto)

    if(createRegionDto.headTrainerId) {
      const user = await User.findOne(createRegionDto.headTrainerId)
      if(!user) {
        throw new HttpException("Указаного пользователя в качестве главы не найдено", HttpStatus.UNPROCESSABLE_ENTITY);
      }
      region.headTrainer = user
    }

    return await this.regionRepository.save(region)
  }

}
