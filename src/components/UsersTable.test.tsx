import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersTable } from "./UsersTable";
import { generateUsersResponse } from "@/lib/mocks/generateUsersResponse";
import { setupServer } from "msw/node";

const queryClient = new QueryClient();

jest.mock("next/navigation", () => ({
  ...require("next-router-mock"),
  useSearchParams: () => ({
    get: (key: String) => "1",
  }),
}));

const server = setupServer();

describe("Users Table", () => {
  const usersResponse = generateUsersResponse();

  beforeAll(() => {
    server.listen();
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/users?_page=1&_limit=3`,
        (req, res, ctx) => {
          return res(ctx.json(usersResponse));
        }
      )
    );
    render(
      <QueryClientProvider client={queryClient}>
        <UsersTable />
      </QueryClientProvider>
    );
  });

  beforeEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => server.close());

  it("should render three users in a table", () => {
    expect(usersResponse.users.length).toBe(3);
  });
  it("should render users name in a table", () => {
    usersResponse.users.forEach(async (user) => {
      expect(await screen.findByText(user.name)).toBeInTheDocument();
    });
  });
});
