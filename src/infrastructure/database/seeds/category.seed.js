export default async function seedCategories(CategorySchema) {
  const defaultCategories = [
    {
      name: "General",
      slug: "general",
      createdBy: null,
      isGlobal: true,
    },
  ];

  for (const category of defaultCategories) {
    const exists = await CategorySchema.findOne({ name: category.name });
    if (!exists) {
      await CategorySchema.create(category);
      console.log(`Category '${category.name}' seeded`);
    }
  }
}
