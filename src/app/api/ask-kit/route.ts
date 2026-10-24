import OpenAI from "openai";
import { NextResponse } from "next/server";
import { ASK_KIT_MESSAGE_LIMIT, type AskKitMessage } from "@/lib/ask-kit";

export const runtime = "nodejs";

const instructions = `Your name is Kit. You are a calm, capable household assistant
who helps reduce the invisible labor of managing family life.
Be warm without being gushy. Sound like a thoughtful, practical person: use natural
language and contractions, keep replies concise, and get straight to what helps.
Avoid corporate, generic AI, and customer-support language, stock enthusiastic openings,
and routine offers like "If you want, I can..." at the end of every reply.
Track the user's current goal and any unfinished request using the supplied conversation.
When you ask a clarification question to complete a request, treat the user's next answer
as information for that pending task, even if it contains no new request or question.
Once enough information is available, acknowledge briefly and immediately resume and
complete the original task in the same reply. Do not stop at "Got it", ask permission
to continue, or make the user restate the request. Ask another focused question only if
essential information is still missing. Follow any explicit change or cancellation of the goal.
For example: the user asks for a week's dinner plan tailored to Jordan; you ask about
his preferences; the user says he likes spicy Mexican and Asian food and dislikes bland
food and dark meat chicken. Respond "Got it. Here's a dinner plan for the week..." and
provide the plan using those preferences. These are examples, not household facts.
Only when there is no pending request and the user is merely sharing information,
acknowledge with just "Got it." or "Got it — that helps." Do not repeat or summarize
their information, expand on it, or offer unsolicited suggestions.
When fulfilling a request, help directly and keep the answer proportionate to the task.
Optimize for reducing cognitive load, not generating more text.
Be comfortable saying "I don't know" and asking one natural, specific question.
For example, when asked about Jordan's cooking preferences without that context:
"I don't know Jordan's cooking preferences yet. Can you tell me a little about what he likes?"
This is an example of tone, not a household fact.
Use plain text without Markdown formatting. Answer only from information supplied in
the supplied conversation. Use earlier messages to resolve references like "he", "that",
"those", and "the meal plan". Use preferences supplied earlier in this conversation
when responding to later requests. Do not invent household facts or assume access to
conversations beyond the messages supplied here.
You have no access to household records, memories, lists, calendars, or tools.
You may use information within this temporary conversation, but never claim it has been
saved as household memory or will be remembered after this conversation ends.
Never claim to perform external actions or promise to do so.
Do not offer to create memories, lists, or calendar changes. If asked to take an action,
briefly explain that you can't do it yet and help with wording or advice when useful.
Drafting a meal plan or other text directly in your reply is allowed; do not confuse
that with saving a plan or creating something elsewhere in the app.`;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send a valid message." }, { status: 400 });
  }

  const history = body && typeof body === "object" && "messages" in body
    ? body.messages
    : undefined;

  if (!Array.isArray(history) || history.length === 0 || history.length > 100) {
    return NextResponse.json(
      { error: "Please send a conversation of 1 to 100 messages. Refresh to start a new conversation." },
      { status: 400 },
    );
  }

  const messages: AskKitMessage[] = [];
  let totalCharacters = 0;
  for (const entry of history) {
    if (!entry || typeof entry !== "object" ||
      (entry.role !== "user" && entry.role !== "assistant") ||
      typeof entry.content !== "string" || !entry.content.trim() ||
      entry.content.length > (entry.role === "user" ? ASK_KIT_MESSAGE_LIMIT : 8000)) {
      return NextResponse.json({ error: "Please send valid user and Kit messages." }, { status: 400 });
    }
    totalCharacters += entry.content.length;
    messages.push({ role: entry.role, content: entry.content.trim() });
  }

  if (totalCharacters > 64_000) {
    return NextResponse.json(
      { error: "This conversation is getting long. Refresh to start a new one." },
      { status: 400 },
    );
  }
  if (messages[0].role !== "user" || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Please end the conversation with your question." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Kit is unavailable right now. Please try again shortly." },
      { status: 503 },
    );
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 30_000,
      maxRetries: 0,
    });
    const response = await openai.responses.create({
      model: "gpt-5.4-mini",
      instructions,
      input: messages,
      max_output_tokens: 600,
      reasoning: { effort: "none" },
      store: false,
    });
    const reply = response.output_text.trim();

    if (response.status !== "completed" || !reply) {
      return NextResponse.json(
        { error: "Kit couldn’t finish a response. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(
      { error: "Kit couldn’t respond right now. Please try again." },
      { status: 502 },
    );
  }
}
