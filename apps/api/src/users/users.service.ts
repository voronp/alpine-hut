import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({Login: login})
  }

  findByEmail(str: string): Promise<User> {
    return this.usersRepository.findOne({Email: str})
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
