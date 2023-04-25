import { Controller, Post, Put, Delete, Get, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private _service: CommentService) {}

  @Get('getComments')
  async getComments(@Req() req: any, @Res() res: any) {
    const result = await this._service.getComments();
    return res.send(result);
  }

  @Get('getComment/:postId')
  async getCommentByPost(@Req() req: any, @Res() res: any) {
    const result = await this._service.getCommentByPost(req.params.postId);
    return res.send(result);
  }

  @Post('createComment')
  async create(@Req() req: any, @Res() res: any) {
    const result = await this._service.create(req.body);
    return res.send(result);
  }

  @Put('updateComment/:id')
  async update(@Req() req: any, @Res() res: any) {
    const result = await this._service.update(req.params.id, req.body);
    return res.send(result);
  }

  @Delete('deleteComment/:postId/:id')
  async delete(@Req() req: any, @Res() res: any) {
    console.log(req.params);
    const result = await this._service.delete(req.params);
    return res.send(result);
  }
}
