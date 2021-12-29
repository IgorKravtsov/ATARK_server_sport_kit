import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Characteristic } from "./characteristic.entity";
import { User } from "../user/user.entity";

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectRepository(Characteristic) private readonly trainingRepository: Repository<Characteristic>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // async getAllUserCharacteristics(user: User): Promise<Characteristic[]> {
  //
  //
  // }

}
