import { Module } from '@nestjs/common';
import { Hardware } from './hardware';
import { StubHardware } from './stub-hardware';
import { AbstractHardware } from './abstract-hardware';

console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'development', process.env.USE_STUB_HARDWARE);

const hardwareProvider = {
  provide: AbstractHardware,
  useClass:
    process.env.USE_STUB_HARDWARE
      ? StubHardware
      : Hardware,
};

@Module({
  providers: [hardwareProvider],
  exports: [hardwareProvider],
})
export class HardwareModule {}
