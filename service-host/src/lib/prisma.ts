import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import path from 'path';

// 1. Pega o caminho absoluto da pasta raiz do seu projeto e junta com 'dev.db'
const dbPath = path.join(process.cwd(), 'dev.db');

// 2. Passa o caminho absoluto para o adaptador
const adapter = new PrismaLibSql({
  url: `file:${dbPath}` 
});

export const prisma = new PrismaClient({ adapter });