import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import { CreateBrowserDto } from './dtos/create-browser.dto';
import { CreateBrowserResponseDto } from './dtos/create-browser-response.dto';
import { ListBrowsersResponseDto } from './dtos/list-browsers-response.dto';
import { GetBrowserResponseDto } from './dtos/get-browser-by-id-response.dto';

@Injectable()
export class BrowsersService {
  private browsers: Map<string, puppeteer.Browser> = new Map();

  async createBrowser(
    createBrowserDto: CreateBrowserDto,
  ): Promise<CreateBrowserResponseDto> {
    const browser = await puppeteer.launch({ headless: true });
    const browserId = uuidv4();
    this.browsers.set(browserId, browser);
    return {
      browserId: browserId,
      browser: { wsEndpoint: browser.wsEndpoint() },
    };
  }

  async stopBrowser(browserId: string): Promise<boolean> {
    const browser = this.browsers.get(browserId);
    if (browser) {
      await browser.close();
      this.browsers.delete(browserId);
      return true;
    }
    return false;
  }

  listBrowsers(): ListBrowsersResponseDto[] {
    return Array.from(this.browsers.entries()).map(([browserId, browser]) => ({
      browserId,
      browser: {
        wsEndpoint: browser.wsEndpoint(),
      },
    }));
  }

  async getBrowserById(
    browserId: string,
  ): Promise<GetBrowserResponseDto | null> {
    const browser = this.browsers.get(browserId);
    if (browser) {
      return {
        browserId: browserId,
        browser: {
          wsEndpoint: browser.wsEndpoint(),
        },
      };
    }
    return null;
  }

  browserExists(browserId: string): boolean {
    return this.browsers.has(browserId);
  }
}
