import debug from 'debug';

class Logger {
  private logger: debug.Debugger;

  constructor(module: string) {
    this.logger = debug(module);
  }

  /**
   * Log the current message info|error
   * @param msg string
   * @param args object
   */
  public log(msg: string, ...args: any[]) {
    this.logger(msg, ...args);
  }
}

export default Logger;
