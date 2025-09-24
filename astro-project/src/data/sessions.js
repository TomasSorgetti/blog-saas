export const emptyInput = {};

export const getAllResponse = {
  success: true,
  status: 200,
  message: "Sessions retrieved successfully",
  data: [
    {
      userId: "68cdd74ceb3d3ce6c8b8e5ae",
      userAgent: "PostmanRuntime/7.46.0",
      ip: "172.18.0.1",
      expiresAt: "2025-10-01T14:27:09.000Z",
      isValid: true,
      createdAt: "2025-09-24T14:29:13.240Z",
    },
  ],
};

export const deleteAllSessionsResponse = {
  success: true,
  status: 201,
  message: "Sessions deleted successfully",
  data: null,
};
