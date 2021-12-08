import { Module } from '@nestjs/common';
import { Hardware } from './hardware';
import { StubHardware } from './stub-hardware';
import { AbstractHardware } from './abstract-hardware';

const hardwareProvider = {
  provide: AbstractHardware,
  useClass:
    process.env.NODE_ENV === 'development'
      ? StubHardware
      : Hardware,
};

@Module({
  providers: [hardwareProvider]
})
export class HardwareModule {}
