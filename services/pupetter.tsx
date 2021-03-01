import puppeteer from 'puppeteer';

const { URL_LANDINGS } = process.env;

class PuppeteerService {
  /**
   * Scan the landing page with the name and save
   * @param name string
   */
  public async takePicture(name: string, format: string = 'jpg') {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({
        width: 1280,
        height: 800,
      });

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
