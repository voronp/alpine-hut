import {Global, Module} from '@nestjs/common';
import {PubSub} from "graphql-subscriptions";
import {ServerState} from "../common/state";

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    {
      provide: 'STATE',
      useValue: new ServerState(),
    },
  ],
  exports: [
    'PUB_SUB',
    'STATE',
  ],
})
export class BaseModule {}
