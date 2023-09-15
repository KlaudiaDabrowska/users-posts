import { faker } from "@faker-js/faker";
import { IPost } from "../types/Posts";

export const generateUserPostsResponse = () => {
  const post: IPost = {
    userId: 1,
    id: faker.number.int({ min: 0, max: 1000 }),
    title: faker.lorem.text(),
    body: faker.lorem.paragraph(),
  };

  const arrayOfPosts: IPost[] = Array.from({ length: 3 }, () => post);

  return {
    pages: { posts: arrayOfPosts, total: 10, nextCursor: 2 },
  };
};
