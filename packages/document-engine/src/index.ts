export type DocumentTemplateMapping = {
  templateId: string;
  outputName: string;
  variablePaths: Record<string, string>;
};

export type DocumentGenerationJob = {
  organizationId: string;
  processInstanceId: string;
  templateId: string;
  variables: Record<string, unknown>;
};

export interface DocumentEngine {
  queuePdfGeneration(job: DocumentGenerationJob): Promise<{ jobId: string }>;
  renderPreview(mapping: DocumentTemplateMapping, variables: Record<string, unknown>): Promise<string>;
}

export class PlaceholderDocumentEngine implements DocumentEngine {
  async queuePdfGeneration(job: DocumentGenerationJob) {
    return { jobId: `document:${job.processInstanceId}:${Date.now()}` };
  }

  async renderPreview(mapping: DocumentTemplateMapping, variables: Record<string, unknown>) {
    return `Preview for ${mapping.outputName}: ${JSON.stringify(variables, null, 2)}`;
  }
}
