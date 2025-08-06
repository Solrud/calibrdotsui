export class TheNews {
  version: string;
  date: Date;
  description: string[];

  constructor(version: string, date: Date, description: string[]) {
    this.version = version;
    this.date = date;
    this.description = description;
  }
}

export const DEFAULT_APP_VERSION = 'v.0.0.0';
