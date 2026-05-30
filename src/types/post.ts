interface BasePost {
  id: number;
  slug: string;
  title: string;
  banner: string;
  createdAt: string;
}

interface PostInfoBasic extends BasePost {
  content: string;
  author: string;
  tags: string[];
  category: string;
}

const initialPostData: PostInfoBasic = {
  id: 0,
  slug: "",
  title: "",
  banner: "",
  createdAt: "",
  content: "",
  author: "",
  tags: [],
  category: "",
};

export { type BasePost, type PostInfoBasic, initialPostData };
