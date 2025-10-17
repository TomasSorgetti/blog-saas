import CategoryEntity from "../../../src/domain/entities/category.entity.js";

describe("CategoryEntity", () => {
  it("should create a category entity with valid properties", () => {
    const data = {
      name: "Algebra",
      createdBy: "user123",
      slug: "algebra",
      isGlobal: false,
    };

    const category = new CategoryEntity(data);
    const obj = category.toObject();

    expect(obj).toEqual({
      name: "Algebra",
      createdBy: "user123",
      slug: "algebra",
      isGlobal: false,
    });
  });

  it("should store private fields correctly", () => {
    const category = new CategoryEntity({
      name: "Geometry",
      createdBy: "teacher001",
      slug: "geometry",
      isGlobal: true,
    });

    expect(category.toObject().isGlobal).toBe(true);
  });
});
