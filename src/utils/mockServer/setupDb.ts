import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import { TOTAL_POSTS } from '../constants';

export function generateFakePosts(count: number) {
  const blogPosts = [];

  for (let i = 0; i < count; i++) {
    blogPosts.push({
      id: faker.string.uuid(),
      title: faker.lorem.words(),
      description: faker.lorem.sentence({ min: 15, max: 25 }),
      post: faker.lorem.paragraphs(),
      releaseDate: faker.date
        .between({
          from: '1991-01-01T00:00:00.000Z',
          to: new Date().toString(),
        })
        .toISOString(),
      author: faker.person.fullName(),
    });
  }

  return blogPosts;
}

const db = { posts: generateFakePosts(TOTAL_POSTS) };

fs.writeFile(
  './src/utils/mockServer/db.json',
  JSON.stringify(db, null, 2),
  (error) => {
    if (error) {
      throw new Error(`Error writing to db.json: ${error}`);
    }
  },
);
