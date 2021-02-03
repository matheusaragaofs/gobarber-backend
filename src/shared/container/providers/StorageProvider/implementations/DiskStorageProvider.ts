import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // alterando o local do arquivo
    // fs.promises garante que vai estar utilizando as funções do filesystem em formato de promises
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, 'uploads', file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    try {
      // stat() retorna o status de um arquivo se ele existir
      await fs.promises.stat(filePath); // ele retorna informações sobre o arquivo, mas se n encontrar o arquivo ele dá erro
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); // se ele encontrou , ele deleta o arquivo
  }
}

export default DiskStorageProvider;
