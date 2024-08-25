import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BrowsersService } from './browsers.service';
import { CreateBrowserDto } from './dtos/create-browser.dto';
import { CreateBrowserResponseDto } from './dtos/create-browser-response.dto';
import { ListBrowsersResponseDto } from './dtos/list-browsers-response.dto';
import { GetBrowserResponseDto } from './dtos/get-browser-by-id-response.dto';

@Controller({
  path: 'browsers',
  version: '1',
})
export class BrowsersController {
  constructor(private readonly browserService: BrowsersService) {}

  @Post()
  async createBrowser(
    @Body() createBrowserDto: CreateBrowserDto,
  ): Promise<CreateBrowserResponseDto> {
    return this.browserService.createBrowser(createBrowserDto);
  }

  @Get()
  listBrowsers(): ListBrowsersResponseDto[] {
    return this.browserService.listBrowsers();
  }

  @Get('/:browserId')
  async getBrowserById(
    @Param('browserId') browserId: string,
  ): Promise<GetBrowserResponseDto | null> {
    return this.browserService.getBrowserById(browserId);
  }

  @Delete('/:browserId')
  async stopBrowser(@Param('browserId') browserId: string) {
    return this.browserService.stopBrowser(browserId);
  }
}
