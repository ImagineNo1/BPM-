import mongoose from "mongoose";

const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/bpm_studio";

async function seed() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("MongoDB connection did not expose a database handle.");
  }

  const organization = {
    name: "نوافریند",
    slug: "nava",
    plan: "business",
    settings: { locale: "fa-IR", direction: "rtl" },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const orgResult = await db.collection("organizations").findOneAndUpdate(
    { slug: organization.slug },
    { $set: organization },
    { upsert: true, returnDocument: "after" },
  );
  const organizationId = orgResult?._id;

  const processResult = await db.collection("processes").findOneAndUpdate(
    { organizationId, key: "purchase-request" },
    {
      $set: {
        organizationId,
        key: "purchase-request",
        name: "درخواست خرید سازمانی",
        description: "نمونه فرایند برای سیستم عملیاتی خرید.",
        status: "published",
        tags: ["finance", "procurement"],
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true, returnDocument: "after" },
  );
  const processId = processResult?._id;

  await db.collection("process_versions").updateOne(
    { processId, version: 1 },
    {
      $set: {
        organizationId,
        processId,
        version: 1,
        status: "published",
        nodes: [
          { nodeId: "start", type: "start_event", label: "شروع", config: {} },
          {
            nodeId: "request_form",
            type: "user_task",
            label: "ثبت درخواست",
            formMapping: { formKey: "purchase-request", writes: ["title", "amount", "costCenter"] },
            dataSchema: { title: "string", amount: "number", costCenter: "string" },
            apiEvents: [{ name: "form.submitted", channel: "runtime" }],
            generatedOutputs: { forms: ["purchase-request"], mobileScreens: ["request-intake"] },
            automationRules: [{ when: "submitted", then: "create_finance_task" }],
          },
          { nodeId: "finance", type: "approval_task", label: "تایید مالی", config: { role: "finance_approver" } },
          { nodeId: "document", type: "document_generation_task", label: "تولید سند", config: { templateKey: "purchase-order" } },
          { nodeId: "end", type: "end_event", label: "پایان", config: {} },
        ],
        edges: [
          { edgeId: "e1", source: "start", target: "request_form" },
          { edgeId: "e2", source: "request_form", target: "finance" },
          { edgeId: "e3", source: "finance", target: "document" },
          { edgeId: "e4", source: "document", target: "end" },
        ],
        variablesSchema: { title: "string", amount: "number", costCenter: "string" },
        generatedOutputs: {
          forms: [{ key: "purchase-request", name: "فرم درخواست خرید" }],
          databaseCollections: [{ name: "purchase_requests" }, { name: "approval_decisions" }],
          restApis: [{ method: "POST", path: "/runtime/processes/purchase-request/start" }],
          mobileScreens: [{ key: "request-intake" }, { key: "finance-approval" }],
          taskInboxes: [{ role: "finance_approver" }],
          documents: [{ key: "purchase-order" }],
          analyticsDashboards: [{ key: "purchase-sla" }],
        },
        publishedAt: new Date(),
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );

  await db.collection("forms").updateOne(
    { organizationId, key: "purchase-request" },
    {
      $set: {
        organizationId,
        processId,
        key: "purchase-request",
        name: "فرم درخواست خرید",
        fields: [
          { fieldId: "title", type: "text", label: "عنوان درخواست", required: true },
          { fieldId: "amount", type: "number", label: "مبلغ پیشنهادی", required: true },
          { fieldId: "costCenter", type: "select", label: "مرکز هزینه", required: true },
        ],
        validationRules: { amount: { min: 1 } },
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );

  await mongoose.disconnect();
  console.log("MongoDB seed completed.");
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
