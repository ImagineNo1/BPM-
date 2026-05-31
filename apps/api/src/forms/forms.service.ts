import { Injectable, NotFoundException } from "@nestjs/common";
import type { CreateFormInput, SubmitFormInput } from "@bpm-studio/shared";
import { InMemoryStore } from "../common/in-memory-store";
import { getMockContext } from "../common/mock-context";

@Injectable()
export class FormsService {
  constructor(private readonly store: InMemoryStore) {}

  findAll(organizationId?: string) {
    return this.store.forms.filter((form) => !organizationId || form.organizationId === organizationId);
  }

  create(input: CreateFormInput) {
    const form = {
      id: this.store.createId("form"),
      organizationId: input.organizationId,
      key: input.key,
      name: input.name,
      schema: input.schema,
      validationRules: input.validationRules,
      createdAt: this.store.now(),
    };
    this.store.forms.push(form);
    return form;
  }

  submit(formId: string, input: SubmitFormInput) {
    const context = getMockContext();
    const form = this.store.forms.find((item) => item.id === formId);
    if (!form) {
      throw new NotFoundException("Form not found");
    }

    const submission = {
      id: this.store.createId("sub"),
      organizationId: input.organizationId ?? context.organizationId,
      formId,
      processInstanceId: input.processInstanceId,
      data: input.data,
      createdAt: this.store.now(),
    };
    this.store.submissions.push(submission);

    if (input.processInstanceId) {
      const instance = this.store.instances.find((item) => item.id === input.processInstanceId);
      if (instance) {
        instance.variables = { ...instance.variables, ...input.data };
      }
    }

    this.store.auditLogs.push({
      id: this.store.createId("audit"),
      organizationId: submission.organizationId,
      processInstanceId: input.processInstanceId,
      event: "form.submitted",
      entityType: "FormSubmission",
      entityId: submission.id,
      payload: { formId, data: input.data },
      createdAt: this.store.now(),
    });

    return submission;
  }
}
