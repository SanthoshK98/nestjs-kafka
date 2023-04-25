/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';
import { PostService } from './post.service';

@Injectable()
export class DeleteConsumer implements OnModuleInit {
  constructor(private readonly _consumer: ConsumerService, private _posts: PostService) {}

  async onModuleInit() {
    this._consumer.consume(
      'delete-entry',
      { topic: 'delete-comment' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            source: 'delete-consumer',
            message: message.value.toString(),
            partition: partition.toString(),
            topic: topic.toString(),
          });
          const data: any = JSON.parse(message.value.toString())
          console.log(data);
          this._posts.deleteComment(data)
        },
      },
    );
  }
}
