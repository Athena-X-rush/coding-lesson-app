const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const lesson1 = await prisma.lesson.create({
        data: {
            title: 'CSS Basics',
            content: 'Learn selectors, box model, Flexbox.',
            quiz: {
                create: {
                    questions: {
                        create: [
                            {
                                question: 'What does padding do?',
                                options: JSON.stringify(['Adds space inside', 'Adds space outside']),
                                correct: 0
                            }
                        ]
                    }
                }
            }
        }
    });
    const group1 = await prisma.group.create({
        data: { name: 'Beginners' }
    });
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
