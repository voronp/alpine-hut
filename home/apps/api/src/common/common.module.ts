import { Module } from '@nestjs/common';
import {DateScalar} from './date'

@Module({
  providers: [DateScalar],
})
export class CommonModule {}
