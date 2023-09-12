import { Module } from '@nestjs/common';
import { Hardware } from './hardware';
import { StubHardware } from './stub-hardware';
import { AbstractHardware } from './abstract-hardware';

console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'development');

const hardwareProvider = {
  provide: AbstractHardware,
  useClass:
    process.env.NODE_ENV === 'development'
      ? StubHardware
      : Hardware,
};

@Module({
  providers: [hardwareProvider],
  exports: [hardwareProvider],
})
export class HardwareModule {}
