import { faker } from "@faker-js/faker";
import { IUser } from "../types/Users";

export const generateUsersResponse = () => {
  const user: IUser = {
    id: faker.number.int({ min: 0, max: 1000 }),
    name: faker.internet.displayName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    address: {
      city: faker.location.city(),
    },
    phone: faker.phone.number(),
    website: faker.internet.url(),
  };

  const arrayOfUsers: IUser[] = Array.from({ length: 3 }, () => user);

  return {
    users: arrayOfUsers,
    total: 10,
  };
};
