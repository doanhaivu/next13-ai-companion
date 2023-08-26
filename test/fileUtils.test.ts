import { readFilesInFolder } from '../lib/fileUtils';
import path from 'path';

describe('readFilesInFolder', () => {
    it('should return an array of objects with NAME and PREAMBLE and SEED_CHAT properties', () => {
        const folderPath = path.join(__dirname, '..', 'companions');
        const result = readFilesInFolder(folderPath);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toHaveProperty('NAME');
        expect(result[0]).toHaveProperty('PREAMBLE');
        expect(result[0]).toHaveProperty('SEED_CHAT');
    });
});