export type MemberId = "alex" | "jordan" | "emma" | "mason" | "harper";

export type HouseholdMember = {
  id: MemberId;
  name: string;
  firstName: string;
  role: "Adult" | "Child";
  age?: number;
  color: string;
};

export const demoHousehold = {
  name: "Parker Household",
  primaryUserId: "alex" as MemberId,
  members: {
    alex: { id: "alex", name: "Alex Parker", firstName: "Alex", role: "Adult", color: "bg-member-alex" },
    jordan: { id: "jordan", name: "Jordan Parker", firstName: "Jordan", role: "Adult", color: "bg-member-jordan" },
    emma: { id: "emma", name: "Emma Parker", firstName: "Emma", role: "Child", age: 14, color: "bg-member-emma" },
    mason: { id: "mason", name: "Mason Parker", firstName: "Mason", role: "Child", age: 11, color: "bg-member-mason" },
    harper: { id: "harper", name: "Harper Parker", firstName: "Harper", role: "Child", age: 8, color: "bg-member-harper" },
  } satisfies Record<MemberId, HouseholdMember>,
};

// Public prototype credentials, not secrets or real authentication.
export const demoCredentials = { email: "alex@kitdemo.com", password: "demo123" };

type BriefItem = {
  id: string;
  time: string;
  title: string;
  detail: string;
  members: MemberId[];
};

export const demoDay = {
  label: "Tuesday, October 13",
  summary: "Tuesday is busy after school, but you’re in good shape.",
  brief: [
    { id: "pickup", time: "3:10 PM", title: "School pickup is covered", detail: "Jordan is picking up Mason and Harper.", members: ["jordan", "mason", "harper"] },
    { id: "homework", time: "4:00 PM", title: "Mason — reading assignment", detail: "Mason has a reading assignment to finish before dinner.", members: ["mason"] },
    { id: "soccer", time: "5:00 PM", title: "Emma’s soccer practice", detail: "Alex is handling the ride.", members: ["emma", "alex"] },
  ] satisfies BriefItem[],
  change: {
    memberId: "emma" as MemberId,
    itemId: "soccer",
    previousTime: "5:00 PM",
    proposedTime: "5:30 PM",
    message: "Emma’s soccer practice has a proposed new time: 5:30 PM.",
    approvedDetail: "Alex is handling the ride. The new practice time is confirmed.",
  },
  dinner: {
    title: "Lemon chicken, rice & roasted broccoli",
    // Safe reference placeholder until the demo has a recipe destination.
    recipeUrl: "https://example.com/",
    time: "6:30 PM",
    cookId: "jordan" as MemberId,
    detail: "Ingredients are on hand. No shopping or prep decisions needed.",
  },
  upcoming: [
    { id: "tournament", when: "This Saturday", title: "Soccer tournament", detail: "An early start for Emma. Alex is handling the ride.", members: ["emma", "alex"] },
    { id: "birthday", when: "Next Tuesday", title: "Harper’s birthday", detail: "A family dinner and cake are on the calendar.", members: ["harper"] },
    { id: "break", when: "October 26–30", title: "School break", detail: "A quieter week for Emma, Mason, and Harper.", members: ["emma", "mason", "harper"] },
  ] satisfies { id: string; when: string; title: string; detail: string; members: MemberId[] }[],
};
