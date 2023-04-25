import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class PostService {
  constructor(private readonly _kafka: ProducerService) {}

  private posts: any = [];
  private postCount = 0;

  async getPosts() {
    console.log('update call');
    return {
      message: 'success',
      data: this.posts,
      count: this.postCount,
    };
  }

  async singlePost(id: string) {
    console.log('single post');
    const findPost = this.posts.find((each: any) => {
      return each.id === id;
    });
    return {
      message: 'success',
      data: findPost,
    };
  }

  async create(data: any) {
    console.log('create call');
    const requestObj = { ...data };
    requestObj.comments = [];
    requestObj.date = Date.now();
    this.posts.push(requestObj);
    this.postCount++;
    console.log(this.posts);
    console.log(this.postCount);
    return {
      message: 'created post',
      count: this.postCount,
      posts: this.posts,
    };
  }

  async update(id: string, data: any) {
    console.log('update call');
    const reqObj = { ...data };
    reqObj.date = Date.now();
    const newPosts: any = this.posts.map((each: any) => {
      if (each.id === id) {
        each = reqObj;
      }
      return each;
    });
    this.posts = newPosts;
    return {
      message: 'updated post',
      posts: this.posts,
    };
  }

  async delete(id: string) {
    console.log('delete call');
    const newPosts: any = this.posts.filter((each: any) => {
      return each.id !== id;
    });
    this.posts = newPosts;
    this.postCount--;
    this._kafka.produce({
      topic: 'delete-post',
      messages: [{ value: JSON.stringify({ id }) }],
    });
    return {
      message: 'Successfully deleted post',
    };
  }

  async createComment(data: any) {
    const exists: any = this.posts.find((each: any) => {
      return each.id === data.postId;
    });
    if (exists) {
      exists.comments.push(data);
    } else {
      console.log('No post found');
    }
  }

  async updateComment(data: any) {
    console.log(data);
    const exists: any = this.posts.find((each: any) => {
      return each.id === data.postId;
    });
    if (exists) {
      const existComment = exists.comments.map((each: any) => {
        if (each.id === data.id) {
          each = data;
        }
        return each;
      });
      exists.comments = existComment;
    } else {
      console.log('No post found');
    }
  }

  async deleteComment(data: any) {
    const exists: any = this.posts.find((each: any) => {
      return each.id === data.postId;
    });
    if (exists) {
      const existComment = exists.comments.filter((each: any) => {
        return each.id !== data.id;
      });
      exists.comments = existComment;
    } else {
      console.log('No post found');
    }
  }
}
