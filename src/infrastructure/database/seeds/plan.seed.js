export default async function seedPlans(PlanSchema) {
  const defaultPlans = [
    {
      name: "free",
      description: "Free plan - basic access",
      limits: {
        maxPosts: 3,
        maxWorkspaces: 1,
        apiAccess: false,
        apiAdvanced: false,
        aiTools: false,
      },
      price: { monthly: 0, yearly: 0 },
      isActive: true,
    },
    {
      name: "pro",
      description: "Pro plan - advanced features",
      limits: {
        maxPosts: 30,
        maxWorkspaces: 3,
        apiAccess: true,
        apiAdvanced: false,
        aiTools: false,
      },
      price: { monthly: 10, yearly: 100 },
      isActive: true,
    },
    {
      name: "premium",
      description: "Premium plan - unlimited & AI features",
      limits: {
        maxPosts: -1,
        maxWorkspaces: 10,
        apiAccess: true,
        apiAdvanced: true,
        aiTools: true,
      },
      price: { monthly: 30, yearly: 300 },
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
