import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/kafka/kafka.module';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DeleteConsumer } from './delete-consumer';

@Module({
  imports: [KafkaModule],
  providers: [CommentService, DeleteConsumer],
  controllers: [CommentController],
})
export class CommentModule {}
