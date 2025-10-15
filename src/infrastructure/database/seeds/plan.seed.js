export default async function seedPlans(PlanSchema) {
  const defaultPlans = [
    {
      name: "Free Plan",
      description: "Free plan - basic access",
      limits: {
        maxPosts: 3,
        maxWorkspaces: 1,
        apiAccess: false,
        apiAdvanced: false,
        aiTools: false,
      },
      price: { monthly: 0, yearly: 0 },
      featureList: ["Up to 3 posts", "1 workspace", "Basic support"],
      stripePriceId: null,
      isActive: true,
    },
    {
      name: "Pro Plan",
      description: "Pro plan - advanced features",
      limits: {
        maxPosts: 30,
        maxWorkspaces: 3,
        apiAccess: true,
        apiAdvanced: false,
        aiTools: false,
      },
      price: { monthly: 10, yearly: 100 },
      featureList: [
        "Up to 30 posts",
        "3 workspaces",
        "Standard API access",
        "Priority support",
      ],
      stripePriceId: "price_1SHHYIPXi2Uj1TwTRIG1YVVA",
      isActive: true,
    },
    {
      name: "Premium Plan",
      description: "Premium plan - unlimited & AI features",
      limits: {
        maxPosts: -1,
        maxWorkspaces: 10,
        apiAccess: true,
        apiAdvanced: true,
        aiTools: true,
      },
      price: { monthly: 25, yearly: 300 },
      featureList: [
        "Unlimited posts",
        "10 workspaces",
        "Advanced API access",
        "AI tools included",
        "24/7 premium support",
      ],
      stripePriceId: "price_1SHIXqPXi2Uj1TwTPTZ8FYl1",
      isActive: true,
    },
    {
      name: "Enterprise Plan",
      description: "Enterprise plan - tailored for large organizations",
      limits: {
        maxPosts: -1,
        maxWorkspaces: 50,
        apiAccess: true,
        apiAdvanced: true,
        aiTools: true,
      },
      price: { monthly: 200, yearly: 2000 },
      featureList: [
        "Unlimited posts",
        "Up to 50 workspaces",
        "Advanced API access",
        "Advanced AI tools",
        "Customized training",
      ],
      stripePriceId: "price_1SII6dPXi2Uj1TwTbSTNP9Qx",
      isActive: true,
    },
  ];

  for (const plan of defaultPlans) {
    const exists = await PlanSchema.findOne({ name: plan.name });
    if (!exists) {
      await PlanSchema.create(plan);
      console.log(`Plan '${plan.name}' seeded`);
    }
  }
}
