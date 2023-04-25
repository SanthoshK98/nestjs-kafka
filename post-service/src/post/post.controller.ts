import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Req,
  Body,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private _service: PostService) {}

  @Get('getPosts')
  async getPosts(@Res() res: any) {
    const result = await this._service.getPosts();
    return res.send(result);
  }

  @Get('singlePost/:id')
  async singlePost(@Req() req: any, @Res() res: any) {
    const result = await this._service.singlePost(req.params.id);
    return res.send(result);
  }

  @Post('createPost')
  async create(@Req() req: any, @Res() res: any) {
    const result = await this._service.create(req.body);
    return res.send(result);
  }

  @Put('updatePost/:id')
  async update(@Req() req: any, @Res() res: any) {
    console.log(req.params.id);
    const result = await this._service.update(req.params.id, req.body);
    return res.send(result);
  }

  @Delete('deletePost/:id')
  async delete(@Req() req: any, @Body() body: any, @Res() res: any) {
    console.log(body);
    const result = await this._service.delete(req.params.id);
    return res.send(result);
  }
}
