import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt'
import { RegistrationDto } from "./DTO/registration.dto";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IRegistrationResponse } from "./types/registrationResponse.interface";
import { UserRoles } from "./types/userRoles.enum";
import { LoginDto } from "./DTO/login.dto";
import { ITokenInformation } from "./DTO/ITokenInformation";
import { Region } from "../region/region.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  generateJWT({id, role}: ITokenInformation): string {
    if(!role || !id) {
      console.log("Указать роль или айди забыл!");
      throw Error("jwt error")
    }
      if(process.env.SECRET_KEY) {
      return sign(
        {id, role},
        process.env.SECRET_KEY,
    {expiresIn: '24h'});
    }
    const message = "There is no secret key to sign";
    console.log(message);
    throw Error(message);
  }

  buildRegistrationResponse(user: User): IRegistrationResponse {
    return {
      token: this.generateJWT({ id: user.id, role: user.role as UserRoles})
    }
  }

  async registration(
    {
      email, password, role, name, level, surname, regionId, trainerId, organizationIds
    }: RegistrationDto): Promise<User> {

    if(!email || !password) {
      throw new HttpException('Email или пароль отсутствуют!', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const candidate = await User.findOne({email});
    if(candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    if(role === UserRoles.LEARNER && !trainerId) {
      throw new HttpException("Тренер не указан!", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new User()

    //TODO: раскоментировать код, когда будет готов сервис организации

    // if(organizationIds.length === 0) {
    //   throw new HttpException("Не указана(-ы) организация(-и)", HttpStatus.UNPROCESSABLE_ENTITY);
    // } else {
    //   let nowOrganization
    //   for (let i = 0; i < organizationIds.length; ++i) {
    //     nowOrganization = await Organization.findOne({id: organizationIds[i]})
    //     if(!nowOrganization) {
    //       throw new HttpException("Не найдена указанная организация", HttpStatus.UNPROCESSABLE_ENTITY);
    //     }
    //     organizations.push(nowOrganization)
    //   }
    // }


    if(regionId) {
      const region = await Region.findOne({id: regionId});
      if(!region) {
        throw new HttpException("Не удалось найти заданный регион!", HttpStatus.UNPROCESSABLE_ENTITY);
      }
      newUser.region = region;
    }

    let trainer;
    if(trainerId) {
      trainer = await this.userRepository.findOne({id: trainerId});
      if(trainer) {
        newUser.trainer = trainer;
      } else {
        throw new HttpException("Не удалось найти тренера!", HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }

    Object.assign(newUser, {email, password, role, name, level, surname, regionId, trainerId, organizationIds})
    return await this.userRepository.save(newUser)
  }

  async login({ email, password }: LoginDto): Promise<User> {

    const user = await this.userRepository.findOne({email}, { select: ['id', 'password', 'role'] });
    if(!user) {
      throw new HttpException("Пользователь с такой почтой не найден!", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    let isCorrectPassword = await compare(password, user.password);
    if(!isCorrectPassword) {
      throw new HttpException("Указан неверный пароль", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return user;
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne(id)
  }

  async updateUser(id: number, updateUserDto: RegistrationDto): Promise<User> {
    const user = await this.findById(id)
    Object.assign(user, updateUserDto)
    return await this.userRepository.save(user)
  }

  async getTrainers(): Promise<User[]> {
    return await this.userRepository.find({role: UserRoles.TRAINER})
      // .then(trainers => trainers.map(trainer => {
      //   delete trainer.email;
      //   return { ...trainer };
      // }))
  }

  async getTrainersByRegionId(regionId: number): Promise<User[]> {

    const region = await Region.findOne({id: regionId})
    return await User.find({role: UserRoles.TRAINER, region })
  }

}
