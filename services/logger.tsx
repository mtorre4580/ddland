import debug from 'debug';

class Logger {
  private logger: debug.Debugger;

  constructor(module: string) {
    this.logger = debug(module);
  }

  /**
   * Log the current message info|error
   * @param {string} msg
   * @param {object} args
   */
  public log(msg: string, ...args: any[]): void {
    this.logger(msg, ...args);
  }
}

export default Logger;
