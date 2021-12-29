import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { addDays, subDays } from 'date-fns';
import { Training } from './training.entity';
import { TrainingCreateDto } from './DTO/training.create.dto';
import { Gym } from '../gym/gym.entity';
import { User } from '../user/user.entity';
import { TrainingGetPeriodDto } from './DTO/training.get.period.dto';
import { UserRoles } from '../user/enums/userRoles.enum';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
    @InjectRepository(Gym) private readonly gymRepository: Repository<Gym>,
  ) {}

  async getAllTrainings(): Promise<Training[]> {
    return await this.trainingRepository.find();
  }

  async getAllTrainingsInSomePeriod(
    currentUser: User,
    getPeriodDto: TrainingGetPeriodDto,
  ): Promise<Training[]> {
    const { periodInDays, thisWeek } = getPeriodDto;
    const nowDate = new Date();

    if (periodInDays) {
      const period = Between(nowDate, addDays(nowDate, parseInt(periodInDays)));
      return await this.trainingRepository.find({
        where: { trainingDate: period },
      });
    }

    if (thisWeek) {
      const day = nowDate.getDay();
      let period;
      if (day === 1) {
        period = Between(nowDate, addDays(nowDate, 6));
      } else if (day > 1 && day < 7) {
        period = Between(subDays(nowDate, day - 1), addDays(nowDate, 7 - day));
      } else if (day === 7) {
        period = Between(subDays(nowDate, 6), nowDate);
      }
      return await this.trainingRepository.find({
        where: { trainingDate: period, trainer: currentUser.trainer },
        relations: ['trainer'],
      });
    }

    throw new HttpException(
      'Не указан ни один из параметров поиска',
      HttpStatus.BAD_REQUEST,
    );
  }

  async createTraining(
    trainer: User,
    createTrainingDto: TrainingCreateDto,
  ): Promise<Training> {
    const training = new Training();
    Object.assign(training, createTrainingDto);
    training.trainer = trainer;

    const { gymId } = createTrainingDto;
    const gym = await this.gymRepository.findOne({ id: gymId });

    if (!gym) {
      throw new HttpException(
        `Зал с id: ${gymId} не найден`,
        HttpStatus.NOT_FOUND,
      );
    }
    training.gym = gym;

    return await this.trainingRepository.save(training);
  }
}
