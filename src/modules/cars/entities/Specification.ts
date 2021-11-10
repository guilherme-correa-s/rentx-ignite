import { v4 as uuidV4 } from 'uuid';

export class Specification {
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

  id?: string;
  name: string;
  description: string;
  created_at: Date;
}
