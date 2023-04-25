/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';
import { CommentService } from './comment.service';

@Injectable()
export class DeleteConsumer implements OnModuleInit {
  constructor(
    private readonly _consumer: ConsumerService,
    private _comment: CommentService,
  ) {}

  async onModuleInit() {
    this._consumer.consume(
      'delete-entry',
      { topic: 'delete-post' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            source: 'delete-consumer',
            message: message.value.toString(),
            partition: partition.toString(),
            topic: topic.toString(),
          });
          const postId: any = JSON.parse(message.value.toString('utf-8'))
          console.log(postId.id)
          this._comment.deletePosts(postId.id);
        },
      },
    );
  }
}
