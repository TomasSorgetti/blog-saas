export const emptyInput = {};

export const createArticleInput = {
  title: "segundo post",
  slug: "segundo-post",
  content: "sarasa asd asd asd asdasdasdas dasd asdasdasdasdasdasdasdasd",
  summary: "sarasa",
  tags: "sarasa",
  status: "PUBLISHED",
  image: "",
  isFeatured: false,
  categories: ["68cdd413217f9ea3b63e1824"],
};

export const createArticleResponse = {
  success: true,
  status: 201,
  message: "Article created successfully",
  data: null,
};

export const getAllArticlesResponse = {
  success: true,
  status: 200,
  message: "Articles retrieved successfully",
  data: {
    items: [
      {
        _id: "68d04f7e5cc5bb153e2522a9",
        title: "segundo post",
        slug: "segundo-post",
        content: "sarasa asd asd asd asdasdasdas dasd asdasdasdasdasdasdasdasd",
        summary: "sarasa",
        tags: "sarasa",
        status: "PUBLISHED",
        views: 0,
        isFeatured: false,
        author: "68cdd74ceb3d3ce6c8b8e5ae",
        categories: [
          {
            _id: "68cdd413217f9ea3b63e1824",
            name: "General",
            slug: "general",
            createdBy: null,
            isGlobal: true,
            createdAt: "2025-09-19T22:07:15.713Z",
            updatedAt: "2025-09-19T22:07:15.713Z",
            __v: 0,
          },
        ],
        createdAt: "2025-09-21T19:18:22.621Z",
        updatedAt: "2025-09-21T19:18:22.621Z",
        __v: 0,
      },
      {
        _id: "68d04a4c840d9c779505d796",
        title: "primer post",
        slug: "primer-post",
        content: "sarasa asd asd asd asdasdasdas dasd asdasdasdasdasdasdasdasd",
        summary: "sarasa",
        tags: "sarasa",
        status: "PUBLISHED",
        views: 0,
        isFeatured: false,
        author: "68cdd74ceb3d3ce6c8b8e5ae",
        categories: [
          {
            _id: "68cdd413217f9ea3b63e1824",
            name: "General",
            slug: "general",
            createdBy: null,
            isGlobal: true,
            createdAt: "2025-09-19T22:07:15.713Z",
            updatedAt: "2025-09-19T22:07:15.713Z",
            __v: 0,
          },
        ],
        createdAt: "2025-09-21T18:56:12.541Z",
        updatedAt: "2025-09-21T18:56:12.541Z",
        __v: 0,
      },
    ],
    total: 2,
    page: 1,
    pages: 1,
  },
};

export const getArticleResponse = {
  success: true,
  status: 200,
  message: "Article retrieved successfully",
  data: {
    _id: "68d04f7e5cc5bb153e2522a9",
    title: "segundo post",
    slug: "segundo-post",
    content: "sarasa asd asd asd asdasdasdas dasd asdasdasdasdasdasdasdasd",
    summary: "sarasa",
    tags: "sarasa",
    status: "PUBLISHED",
    views: 0,
    isFeatured: false,
    author: "68cdd74ceb3d3ce6c8b8e5ae",
    categories: [
      {
        _id: "68cdd413217f9ea3b63e1824",
        name: "General",
        slug: "general",
        createdBy: null,
        isGlobal: true,
        createdAt: "2025-09-19T22:07:15.713Z",
        updatedAt: "2025-09-19T22:07:15.713Z",
        __v: 0,
      },
    ],
    createdAt: "2025-09-21T19:18:22.621Z",
    updatedAt: "2025-09-21T19:18:22.621Z",
    __v: 0,
  },
};

export const updateArticleResponse = {
  success: true,
  status: 201,
  message: "Article updated successfully",
  data: null,
};

export const deleteArticleResponse = {
  success: true,
  status: 201,
  message: "Article deleted successfully",
  data: null,
};
