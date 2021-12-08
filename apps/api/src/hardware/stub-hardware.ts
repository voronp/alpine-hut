import { Injectable } from '@nestjs/common';
import { AbstractHardware } from "./abstract-hardware";

@Injectable()
export class StubHardware extends AbstractHardware {

}
