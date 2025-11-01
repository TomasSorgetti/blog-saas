import WorkbenchEntity from "../entities/workbench.entity.js";

export default class WorkbenchFactory {
  create({
    name,
    owner,
    members = [],
    settings = { theme: "light", color: null, integrations: [] },
    isArchived = false,
  }) {
    return new WorkbenchEntity({
      name,
      owner,
      members,
      settings,
      isArchived,
    });
  }

  createWithDefaults(owner, name = "New Workbench") {
    return new WorkbenchEntity({
      name,
      owner,
      members: [{ userId: owner, role: "owner" }],
      settings: { theme: "light", color: null, integrations: [] },
    });
  }

  createFromTemplate({ owner, template }) {
    return new WorkbenchEntity({
      name: template.name || "Untitled",
      owner,
      members: [{ userId: owner, role: "owner" }],
      settings: {
        theme: template.settings?.theme || "light",
        color: template.settings?.color || null,
        integrations: template.settings?.integrations || [],
      },
    });
  }
}
