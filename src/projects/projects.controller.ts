import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiTags('Projects API')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // 프로젝트 인원 추가
  @Post('projectIn/:projectId')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '프로젝트 참가 인원 추가',
    description: '프로젝트에 인원 추가',
  })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: '프로젝트에 참여 완료 했습니다.',
  })
  @ApiUnauthorizedResponse({
    description: '프로젝트에 참여 하실 수 없습니다.',
  })
  async addProjectPerson(@Param('projectId') projectId, @Req() req) {
    return await this.projectsService.addProjectPerson(
      projectId,
      req.user.user,
    );
  }

  @Post(':projectId')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '프로젝트 방장확인',
    description: '프로젝트에 참가 확인과 방장 확인',
  })
  async project(@Req() req, @Param('projectId') id) {
    return await this.projectsService.project(req.user.user, id);
  }

  @Post('projectOut/:projectId')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '프로젝트 나가기',
    description: '프로젝트 나가기',
  })
  async outProject(@Req() req, @Param('projectId') id) {
    return await this.projectsService.outProject(req.user.user, id);
  }

  @Post('start/:projectId')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '프로젝트 시작',
    description: 'response: 프로젝트 시작시간, 시작되었습니다.',
  })
  async startProject(@Req() req, @Param('projectId') id) {
    return await this.projectsService.startProject(req.user.user, id);
  }
}
