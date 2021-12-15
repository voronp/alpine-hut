import { Module, Global } from '@nestjs/common';
import { HistoryService } from './history.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {History} from "./history.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
  ],
  providers: [HistoryService],
  exports: [
    HistoryService,
  ]
})
export class HistoryModule {}
