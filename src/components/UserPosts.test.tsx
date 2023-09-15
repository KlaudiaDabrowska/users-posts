import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupServer } from "msw/node";
import { generateUserPostsResponse } from "@/lib/mocks/generateUserPostsResponse";
import UserPosts from "./UserPosts";

const queryClient = new QueryClient();

jest.mock("next/navigation", () => ({
  ...require("next-router-mock"),
  useSearchParams: () => ({
    get: (key: String) => "1",
  }),
}));

const server = setupServer();

describe("User posts", () => {
  const postsResponse = generateUserPostsResponse();

  beforeAll(() => {
    server.listen();
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/users/1/posts?_page=1&_limit=3`,
        (req, res, ctx) => {
          return res(ctx.json(postsResponse));
        }
      )
    );
    render(
      <QueryClientProvider client={queryClient}>
        <UserPosts userId={1} />
      </QueryClientProvider>
    );
  });

  beforeEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => server.close());

  it("should display the user's three posts first", () => {
    expect(postsResponse.pages.posts.length).toBe(3);
  });
  it("should render user posts", () => {
    postsResponse.pages.posts.forEach(async (post) => {
      expect(await screen.findByText(post.title)).toBeInTheDocument();
    });
  });
});
