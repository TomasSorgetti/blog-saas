export const emptyInput = {};

export const createCategoryInput = {
  name: "javascript",
};

export const updateCategoryInput = {
  name: "javascript",
};

export const getAllCategoriesResponse = {
  success: true,
  status: 200,
  message: "Category retrieved successfully",
  data: [
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
};

export const createCategoryResponse = {
  success: true,
  status: 201,
  message: "Category created successfully",
  data: null,
};

export const updateCategoryResponse = {
  success: true,
  status: 201,
  message: "Category updated successfully",
  data: null,
};

export const deleteCategoryResponse = {
  success: true,
  status: 201,
  message: "Category deleted successfully",
  data: null,
};
