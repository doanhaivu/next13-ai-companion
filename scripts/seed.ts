const path = require('path');
const fs = require('fs');
const { randomUUID } = require('crypto'); 
const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

/*
interface SeedFileData {
  NAME: string;
  PREAMBLE: string;
  SEED_CHAT: string;
}*/

async function readFilesInFolder(folderPath) {
  // Read the contents of the folder
  const files = fs.readdirSync(folderPath);
  // Loop through each file and create an object with PREAMBLE and SEED_CHAT properties
  const data = files.map((file) => {
    // Read the contents of the file
    const text = fs.readFileSync(path.join(folderPath, file), "utf8");

    const nameMatch = text.match(/NAME:\s*\n\n([\s\S]*?)\n\nPREAMBLE:/);
    const preambleMatch = text.match(/PREAMBLE:\s*\n\n([\s\S]*?)\n\nSEED_CHAT:/);
    const seedChatMatch = text.match(/SEED_CHAT:\s*\n\n([\s\S]*)/);

    const name = nameMatch ? nameMatch[1].trim() : '';
    const preamble = preambleMatch ? preambleMatch[1].trim() : '';
    const seedChat = seedChatMatch ? seedChatMatch[1].trim() : '';

    // Create the object with PREAMBLE and SEED_CHAT properties
    return { NAME: name, PREAMBLE: preamble, SEED_CHAT: seedChat };
  });

  return data;
}

async function seedCategroies() {
  try {
    await db.category.createMany({
      data: [
        { name: 'Famous People' },
        { name: 'Movies & TV' },
        { name: 'Musicians' },
        { name: 'Games' },
        { name: 'Animals' },
        { name: 'Philosophy' },
        { name: 'Scientists' },
      ],
    });
  } catch (error) {
    console.error('Error seeding default categories:', error);
  } finally {
    await db.$disconnect();
  }
}

async function seedCompanions() {
  try {
    const category = await db.category.findFirst({
      where: { name: 'Famous People' }
    });
    console.log(category);

    const folderPath = path.join(__dirname, '..', 'companions');
    const data = await readFilesInFolder(folderPath);
    const companions = data.map(async (item) => {
        await db.companion.create({
          data: { 
          id: randomUUID(),
          userId: 'system',
          userName: 'system',
          name: item.NAME,
          description: `Conversation with ${item.NAME} AI.`,
          instructions: item.PREAMBLE,
          category: { connect: { id: category.id } },
          seed: item.SEED_CHAT,
          src: '',
          shownOnDashboard: true
        }
      });
    });

  } catch (error) {
    console.error('Error seeding default categories:', error);
  } finally {
    await db.$disconnect();
  }
}

async function seedGenericConversationCompanion() {
  try {
    const category = await db.category.findFirst({
      where: { name: 'Famous People' }
    });

    await db.companion.create({
      data: { 
        id: 'genericconversation',
        userId: 'system',
        userName: 'system',
        name: 'Genius',
        description: 'General conversation with a genius.',
        instructions: 'Ask me anything.',
        category: { connect: { id: category.id } },
        seed: 'Hello, I am a genius. I know everything. Ask me anything.',
        src: '',
        shownOnDashboard: false
      },
    });
  } catch (error) {
    console.error('Error seeding default categories:', error);
  } finally {
    await db.$disconnect();
  }
}

async function main() {
  // await seedCategroies();
  await seedCompanions();
  // await seedGenericConversationCompanion();  
}

main();
