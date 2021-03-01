let chrome: any = { args: {}};
let puppeteer: any;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  puppeteer = require('puppeteer');
}

const { URL_LANDINGS } = process.env;

class PuppeteerService {
  /**
   * Scan the landing page with the name and save
   * @param name string
   */
  public async takePicture(name: string, format: string = 'jpg') {
    try {
      let browser = await puppeteer.launch({
        args: ['--hide-scrollbars', '--disable-web-security'],
        defaultViewport: {
          width: 1280,
          height: 800,
        },
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });

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
