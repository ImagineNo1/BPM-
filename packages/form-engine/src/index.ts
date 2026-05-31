import type { FormFieldType } from "@bpm-studio/shared";

export type FormFieldDefinition = {
  id: string;
  type: FormFieldType;
  label: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  validations?: Record<string, unknown>;
};

export type RuntimeFormDefinition = {
  key: string;
  title: string;
  fields: FormFieldDefinition[];
};

export interface FormEngine {
  validateSubmission(form: RuntimeFormDefinition, data: Record<string, unknown>): Promise<Record<string, unknown>>;
  mapSubmissionToVariables(data: Record<string, unknown>, mapping?: Record<string, string>): Record<string, unknown>;
}

export class PlaceholderFormEngine implements FormEngine {
  async validateSubmission(form: RuntimeFormDefinition, data: Record<string, unknown>) {
    for (const field of form.fields) {
      if (field.required && data[field.id] == null) {
        throw new Error(`Field ${field.id} is required.`);
      }
    }

    return data;
  }

  mapSubmissionToVariables(data: Record<string, unknown>, mapping: Record<string, string> = {}) {
    return Object.entries(data).reduce<Record<string, unknown>>((variables, [key, value]) => {
      variables[mapping[key] ?? key] = value;
      return variables;
    }, {});
  }
}
