import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class CommentService {
  constructor(private readonly _kafka: ProducerService) {}

  private comments: any = [];
  private commentCount = 0;

  async getComments() {
    console.log('get call');
    return {
      message: 'success',
      data: this.comments,
    };
  }

  async getCommentByPost(postId: string) {
    console.log('single comment');
    const findCommentByPost = this.comments.filter((each: any) => {
      return each.postId === postId;
    });
    return {
      message: 'success',
      data: findCommentByPost,
    };
  }

  async create(data: any) {
    console.log('create call');
    this.comments.push(data);
    this.commentCount++;
    this._kafka.produce({
      topic: 'create-comment',
      messages: [{ value: JSON.stringify(data) }],
    });
    return {
      message: 'created comment',
      count: this.commentCount,
      comments: this.comments,
    };
  }

  async update(id: string, data: any) {
    console.log('update call');
    const exists: any = this.comments.map((each: any) => {
      if (each.id === id) {
        each = data;
      }
      return each;
    });
    this.comments = exists;
    const payload = { ...data, id };
    this._kafka.produce({
      topic: 'update-comment',
      messages: [{ value: JSON.stringify(payload) }],
    });
    return {
      message: 'updated post',
      comments: this.comments,
    };
  }

  async delete(params: any) {
    console.log('delete call');
    const newComments: any = this.comments.filter((each: any) => {
      return each.id !== params.id;
    });
    this.commentCount--;
    this.comments = newComments;
    const res: any = this._kafka.produce({
      topic: 'delete-comment',
      messages: [
        { value: JSON.stringify({ id: params.id, postId: params.postId }) },
      ],
    });
    res
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
    return {
      message: 'Successfully deleted post',
    };
  }

  async deletePosts(id: string) {
    const newComments: any = this.comments.filter((each: any) => {
      return each.postId !== id;
    });
    this.comments = newComments;
  }
}
