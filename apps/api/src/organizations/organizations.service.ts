import { Injectable } from "@nestjs/common";
import type { CreateOrganizationInput } from "@bpm-studio/shared";
import { InMemoryStore } from "../common/in-memory-store";

@Injectable()
export class OrganizationsService {
  constructor(private readonly store: InMemoryStore) {}

  findAll() {
    return this.store.organizations;
  }

  create(input: CreateOrganizationInput) {
    const organization = {
      id: this.store.createId("org"),
      name: input.name,
      slug: input.slug,
      createdAt: this.store.now(),
    };
    this.store.organizations.push(organization);
    return organization;
  }
}
