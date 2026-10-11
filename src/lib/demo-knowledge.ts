import { demoDay, type MemberId } from "@/lib/demo-household";

export type KnowledgeType = "Rule" | "Strong preference" | "Preference" | "Pattern" | "Observation" | "Temporary context";
export type KnowledgeGroup = "preferences" | "rules" | "temporary";

export type HouseholdMemory = {
  id: string;
  group: KnowledgeGroup;
  type: KnowledgeType;
  statement: string;
  scope: MemberId | "household";
  source: string;
  sourceDetail: string;
  learnedWhen: string;
  useDescription: string;
  confidence?: "High" | "Medium";
  startsOn?: string;
  expiresOn?: string;
  editedOn?: string;
};

export const knowledgeGroups = [
  { id: "preferences", title: "Preferences & patterns", description: "What works well for your people. Preferences guide choices; patterns can change." },
  { id: "rules", title: "Rules", description: "Explicit constraints to respect when making a plan." },
  { id: "temporary", title: "Temporary context", description: "Useful for now, with a clear end date." },
] satisfies { id: KnowledgeGroup; title: string; description: string }[];

export const demoKnowledge: HouseholdMemory[] = [
  {
    id: "jordan-weeknight-meals", group: "preferences", type: "Preference", scope: "jordan",
    statement: "Jordan prefers Instant Pot meals on weeknights.",
    source: "Learned from conversation", confidence: "High",
    learnedWhen: "September 18, 2026",
    sourceDetail: "Jordan mentioned this while planning weeknight dinners on September 18. Instant Pot meals make busy evenings easier; this is a preference, not a fixed rule.",
    useDescription: "Kit remembers it because it may make weeknight meal decisions easier, especially when Jordan is cooking. It can guide meal suggestions while leaving room for other choices.",
  },
  {
    id: "friday-takeout", group: "preferences", type: "Pattern", scope: "household",
    statement: "The family usually gets takeout on Friday nights.",
    source: "Observed from meal planning", confidence: "Medium",
    learnedWhen: "September–early October 2026",
    sourceDetail: "Kit noticed takeout in several Friday meal plans during September and early October. The pattern is still emerging, rather than a commitment for every Friday.",
    useDescription: "Kit remembers the emerging routine because it may help avoid unnecessary Friday meal prep or groceries. It may check whether the household wants takeout before planning dinner.",
  },
  {
    id: "emma-tournament-pasta", group: "preferences", type: "Preference", scope: "emma",
    statement: "Emma prefers pasta before soccer tournament days.",
    source: "Learned from conversation", confidence: "High",
    learnedWhen: "September 26, 2026",
    sourceDetail: "Emma shared this while discussing tournament-weekend meals on September 26. She prefers pasta the evening before a tournament; other meals are still an option.",
    useDescription: "Kit remembers this because a familiar dinner may make tournament preparation easier for Emma. It may suggest pasta when planning those evenings, while keeping other meals an option.",
  },
  {
    id: "appointment-time", group: "rules", type: "Rule", scope: "household",
    statement: "Do not schedule family appointments before 9:00 AM.",
    source: "Explicitly set by Alex",
    learnedWhen: "September 12, 2026",
    sourceDetail: "Alex explicitly set this rule while discussing the school-morning routine on September 12. It is a household constraint, rather than an inference from past appointments.",
    useDescription: "Kit remembers this as a constraint to protect the household’s school-morning routine. It should avoid suggesting family appointments before 9:00 AM, rather than treat that time as an ordinary preference.",
  },
  {
    id: "mason-reading", group: "preferences", type: "Preference", scope: "mason",
    statement: "Mason enjoys reading adventure stories.",
    source: "Learned from conversation", confidence: "High",
    learnedWhen: "October 6, 2026",
    sourceDetail: "Alex mentioned Mason’s interest in adventure stories while organizing his reading assignment on October 6. This is an interest, not a requirement for every book.",
    useDescription: "Kit remembers this interest because it may help make reading time more appealing to Mason. It can draw on it when helping plan reading time or suggesting books he might enjoy.",
  },
  {
    id: "harper-dairy", group: "rules", type: "Rule", scope: "harper",
    statement: "Harper has a dairy allergy.",
    source: "Explicitly set by Alex",
    learnedWhen: "September 12, 2026",
    sourceDetail: "Alex explicitly shared Harper’s dairy allergy while reviewing household food rules on September 12. It is a meal-planning constraint, not a food preference.",
    useDescription: "Kit remembers this as a food constraint because household meal plans need to account for Harper’s allergy. It may flag dairy ingredients in meals and birthday food; this is not an ordinary preference.",
  },
  {
    id: "jordan-coaching", group: "temporary", type: "Temporary context", scope: "jordan",
    statement: "Jordan is coaching soccer on Thursdays and won’t be home until 8 PM.",
    source: "Learned from conversation", startsOn: "2026-10-01", expiresOn: "2026-11-12",
    learnedWhen: "September 29, 2026",
    sourceDetail: "Jordan shared the six-week coaching schedule while coordinating Thursday evenings on September 29. The commitment runs from October 1 through November 12.",
    useDescription: "Kit remembers this short-term availability because it affects Thursday dinners and household responsibilities. It uses the context only through November 12, unless you end it earlier.",
  },
  {
    id: "alex-travel", group: "temporary", type: "Temporary context", scope: "alex",
    statement: "Alex is traveling for work Wednesday–Thursday next week.",
    source: "Learned from conversation", startsOn: "2026-10-21", expiresOn: "2026-10-22",
    learnedWhen: "October 8, 2026",
    sourceDetail: "Alex mentioned the October 21–22 work trip while reviewing next week’s plans on October 8. This context is useful for planning now and ends after the trip.",
    useDescription: "Kit remembers the trip because school pickup and meals may need another plan while Alex is away. It uses this context only through October 22, unless you end it earlier.",
  },
];

export function formatKnowledgeDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function memoryConfidence(memory: HouseholdMemory) {
  if (memory.group !== "preferences" || !memory.confidence) return null;
  return memory.confidence === "High" ? "High confidence" : "Still learning";
}

// The prototype follows the same fixed day as Home, rather than the viewer's clock.
export const knowledgeToday = demoDay.date;
