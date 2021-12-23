import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Gym } from "./gym.entity";
import { GymCreateDto } from "./DTO/gym.create.dto";

@Injectable()
export class GymService {
  constructor(@InjectRepository(Gym) private readonly gymRepository: Repository<Gym>) {}

  async getAllGyms(): Promise<Gym[]> {
    return await this.gymRepository.find()
  }

  async create(createGymDto: GymCreateDto): Promise<Gym> {
    const gym = this.gymRepository.create()
    Object.assign(gym, createGymDto)

    return await this.gymRepository.save(gym)
  }
}
