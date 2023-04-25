import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [PostModule, KafkaModule],
})
export class AppModule {}
