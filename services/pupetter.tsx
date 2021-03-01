import chromium from 'chrome-aws-lambda';

const { URL_LANDINGS } = process.env;

class PuppeteerService {
  private async getBrowserInstance() {
    const executablePath = await chromium.executablePath;

    if (!executablePath) {
      const puppeteer = require('puppeteer');
      return puppeteer.launch({
        args: chromium.args,
        headless: true,
        defaultViewport: {
          width: 1280,
          height: 720,
        },
        ignoreHTTPSErrors: true,
      });
    }

    return chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: {
        width: 1280,
        height: 720,
      },
      executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
  }

  /**
   * Scan the landing page with the name and save
   * @param name string
   */
  public async takePicture(name: string, format: string = 'jpg') {
    try {
      const browser = await this.getBrowserInstance();
      const page = await browser.newPage();

      await page.goto(`${URL_LANDINGS}${name}`);

      await page.screenshot({
        path: `${name}.${format}`,
        fullPage: true,
      });
      await browser.close();
    } catch (err) {
      console.log('Error when trying to take a picture for the current landing', err);
      throw new Error('Error scan landing');
    }
  }
}

export default new PuppeteerService();
