import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt'
import { RegistrationDto } from "./DTO/registration.dto";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { IRegistrationResponse } from "./interfaces/IRegistrationResponse";
import { UserRoles } from "./enums/userRoles.enum";
import { LoginDto } from "./DTO/login.dto";
import { ITokenInformation } from "./interfaces/ITokenInformation";
import { Region } from "../region/region.entity";
import { Organization } from "../organization/organization.entity";
import { IOrganizationResponse } from "./interfaces/IOrganizationResponse";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Organization) private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(Region) private readonly regionRepository: Repository<Region>,
  ) {}

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

  buildOrganizationResponse(organization: Organization): IOrganizationResponse {
    return {
      id: organization.id,
      title: organization.title
    }
  }

  async registration(registrationDto: RegistrationDto): Promise<User> {

    const candidate = await this.userRepository.findOne({email: registrationDto.email});
    if(candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    if(registrationDto.role === UserRoles.LEARNER && !registrationDto.trainerId) {
      throw new HttpException("Тренер не указан!", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new User()
    Object.assign(newUser, registrationDto)

    if(registrationDto.regionId) {
      const region = await this.regionRepository.findOne({id: registrationDto.regionId});
      if(!region) {
        throw new HttpException("Не удалось найти заданный регион!", HttpStatus.NOT_FOUND);
      }
      newUser.region = region;
    }

    if(registrationDto.trainerId) {
      const trainer = await this.userRepository.findOne({id: registrationDto.trainerId});
      if(!trainer) {
        throw new HttpException("Не удалось найти тренера!", HttpStatus.NOT_FOUND);
      }
      newUser.trainer = trainer;
    }


    if(registrationDto.organizationIds.length === 0) {
      throw new HttpException("Не указана(-ы) организация(-и)", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const organizations: Organization[] = []
    for(const nowOrganizationId of registrationDto.organizationIds) {
      const nowOrganization = await this.organizationRepository.findOne({id: nowOrganizationId})
      if(!nowOrganization) {
        throw new HttpException(`Не найдена организация c id ${nowOrganizationId}`, HttpStatus.NOT_FOUND);
      }
      organizations.push(nowOrganization)
    }
    newUser.organizations = organizations

    await this.userRepository.save(newUser)
    return newUser
  }

  async login({ email, password }: LoginDto): Promise<User> {

    const user = await this.userRepository.findOne({email}, { select: ['id', 'password', 'role'] });
    if(!user) {
      throw new HttpException("Пользователь с такой почтой не найден!", HttpStatus.NOT_FOUND);
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

  async updateUser(id: number, updateUserDto: RegistrationDto): Promise<UpdateResult> {
    const user = await this.findById(id)
    const {email, password, role, level, name, surname, regionId, trainerId, organizationIds} = updateUserDto
    Object.assign(user, {email, password, role, level, name, surname})


    return await this.userRepository.update({id: user.id}, {...user})
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

  async getUserOrganizations(userId: number): Promise<Organization[]> {
    const organizations = await Organization.find({relations: ['users']});
    return organizations.filter(organization => organization.users.filter(user => user.id === userId).length > 0)
  }

  async getLearnersOfTheTrainer(user: User): Promise<User[]> {
    // if(user.role === UserRoles.LEARNER) {
    //   throw new HttpException("Не достаточно прав!", HttpStatus.FORBIDDEN)
    // }
    const learners = await this.userRepository.find({trainer: user})
    return learners.filter(learner => learner.role === UserRoles.LEARNER)
  }

  async getPayment(user: User): Promise<number> {

    return '' as any
  }

  async makeTrainerFromLearner(learnerId: number): Promise<User> {
    const user = await this.findById(learnerId)
    if(user.role !== UserRoles.LEARNER) {
      throw new HttpException("Нельзя обновить роль не у ученика", HttpStatus.BAD_REQUEST)
    }
    user.role = UserRoles.TRAINER
    return await this.userRepository.save(user);
  }
}
