export const MOCK_ORGANIZATION_ID = process.env.MOCK_ORGANIZATION_ID ?? "org_nava";
export const MOCK_USER_ID = "user_sara";

export type RequestContext = {
  organizationId: string;
  userId: string;
};

export function getMockContext(): RequestContext {
  return {
    organizationId: MOCK_ORGANIZATION_ID,
    userId: MOCK_USER_ID,
  };
}
