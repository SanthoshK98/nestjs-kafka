import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { CreateConsumer } from './create-consumer';
import { UpdateConsumer } from './update-consumer';
import { DeleteConsumer } from './delete-consumer';

@Module({
  imports: [KafkaModule],
  providers: [PostService, CreateConsumer, UpdateConsumer, DeleteConsumer],
  controllers: [PostController],
})
export class PostModule {}
