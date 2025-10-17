import WorkbenchEntity from "../../../src/domain/entities/workbench.entity.js";
import { InvalidInputError } from "../../../src/domain/errors/index.js";

describe("WorkbenchEntity", () => {
  const owner = { _id: "user1", username: "owner1", email: "owner@test.com" };

  it("should create a workbench with default values", () => {
    const wb = new WorkbenchEntity({ name: "Test WB", owner });
    const obj = wb.toObject();

    expect(obj.name).toBe("Test WB");
    expect(obj.owner).toEqual(owner);
    expect(obj.members.length).toBe(1);
    expect(obj.members[0].userId).toEqual(owner);
    expect(obj.members[0].role).toBe("owner");
    expect(obj.isArchived).toBe(false);
    expect(obj.settings.theme).toBe("light");
  });

  it("should throw error if name is missing", () => {
    expect(() => new WorkbenchEntity({ owner })).toThrow(InvalidInputError);
  });

  it("should throw error if owner is missing", () => {
    expect(() => new WorkbenchEntity({ name: "Test WB" })).toThrow(
      InvalidInputError
    );
  });

  it("should add and remove members correctly", () => {
    const wb = new WorkbenchEntity({ name: "Test WB", owner });
    const member = {
      _id: "user2",
      username: "editor",
      email: "editor@test.com",
    };

    wb.addMember(member);
    expect(wb.members.length).toBe(2);

    wb.removeMember(member);
    expect(wb.members.length).toBe(1);
  });

  it("sanitized() should format data correctly", () => {
    const wb = new WorkbenchEntity({ name: "WB", owner });
    const sanitized = wb.sanitized();

    expect(sanitized.name).toBe("WB");
    expect(sanitized.owner.id).toBe(owner._id);
    expect(sanitized.members[0].role).toBe("owner");
  });
});
