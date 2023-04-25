/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';
import { PostService } from './post.service';

@Injectable()
export class CreateConsumer implements OnModuleInit {
  constructor(
    private readonly _consumer: ConsumerService,
    private _posts: PostService,
  ) {}

  async onModuleInit() {
    this._consumer.consume(
      'create-entry',
      { topic: 'create-comment' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            source: 'create-consumer',
            message: message.value.toString(),
            partition: partition.toString(),
            topic: topic.toString(),
          });
          const data: any = JSON.parse(message.value.toString())
          console.log(data)
          this._posts.createComment(data)
        },
      },
    );
  }
}
