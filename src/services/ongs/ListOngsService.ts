import { Ong } from '.prisma/client';

import { database } from '../../database';

export class ListOngsService {
  async execute(): Promise<Ong[]> {
    const ongs = await database.ong.findMany();

    return ongs;
  }
}
