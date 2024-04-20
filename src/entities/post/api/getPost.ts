import { createRequest } from "../../../utils/createRequest";

type Request = {
  postId: number;
  params?: {
    page?: number;
    search?: string;
  };
};

type Response = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPost = createRequest<Request, Response>((options) => {
  const { postId, ...other } = options;

  return {
    url: `/posts/${postId}`,
    ...other,
  };
});
