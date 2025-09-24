export const emptyInput = {};

export const registerBody = {
  username: "Tomas Sorg",
  email: "tomas.sorgetti@davinci.edu.ar",
  password: "admin",
};

export const loginBody = {
  email: "tomassorgetti456@gmail.com",
  password: "admin",
  rememberme: false,
};

export const verifyBody = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM1ZjBlZTIwMDQ0OTQ1ODRiYjIyYWMi...",
};

export const registerResponse = {
  success: true,
  status: 200,
  message:
    "User registered successfully. Please verify your email to activate your account.",
  data: {
    username: "Tomas Sorgetti",
    email: "tomassorgetti456@gmail.com",
    tokenExpiresIn: "2025-09-13T23:32:14.161Z",
  },
};

export const loginResponse = {
  success: true,
  status: 200,
  message: "Auth retrieved successfully",
  data: {
    user: {
      id: "68cdd74ceb3d3ce6c8b8e5ae",
      username: "Tomas Sorgetti",
      email: "tomassorgetti456@gmail.com",
      role: "user",
      avatar: null,
      isVerified: true,
      lastLogin: "2025-09-21T19:17:58.717Z",
      isActive: true,
      loginMethods: [
        {
          provider: "email",
          addedAt: "2025-09-19T22:21:00.863Z",
          _id: "68cdd74ceb3d3ce6c8b8e5af",
        },
      ],
      twoFactorEnabled: false,
      createdAt: "2025-09-19T22:21:00.863Z",
      preferences: {
        language: "en",
        notifications: {
          email: {
            marketing: false,
            productUpdates: true,
            activity: true,
          },
          push: false,
        },
      },
      subscription: "68cdd74ceb3d3ce6c8b8e5b2",
    },
    sessionId: "68d3ffbdd3fa1de923ede2e4",
  },
};

export const verifyResponse = {
  success: true,
  status: 200,
  message: "User verified successfully",
};

export const refreshResponse = {
  success: true,
  status: 201,
  message: "Token refreshed successfully",
  data: null,
};

export const logoutResponse = {
  success: true,
  status: 200,
  message: "User logged out successfully",
  data: null,
};
