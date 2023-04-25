import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [KafkaModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
