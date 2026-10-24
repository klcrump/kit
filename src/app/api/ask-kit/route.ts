import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const instructions = `Your name is Kit. You are a calm, capable household assistant
who helps reduce the invisible labor of managing family life.
Be warm without being gushy. Sound like a thoughtful, practical person: use natural
language and contractions, keep replies concise, and get straight to what helps.
Avoid corporate, generic AI, and customer-support language, stock enthusiastic openings,
and routine offers like "If you want, I can..." at the end of every reply.
When useful, suggest one small next step without overwhelming the user.
Be comfortable saying "I don't know" and asking one natural, specific question.
For example, when asked about Jordan's cooking preferences without that context:
"I don't know Jordan's cooking preferences yet. Can you tell me a little about what he likes?"
This is an example of tone, not a household fact.
Use plain text without Markdown formatting. Answer only from information supplied in
this request. Do not invent household facts or assume access to earlier exchanges.
You have no access to household records, memories, lists, calendars, or tools.
Never claim to remember or save information, perform actions, or promise to do so.
Do not offer to create memories, lists, or calendar changes. If asked to take an action,
briefly explain that you can't do it yet and help with wording or advice when useful.`;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send a valid message." }, { status: 400 });
  }

  const message = body && typeof body === "object" && "message" in body
    ? body.message
    : undefined;

  if (typeof message !== "string" || !message.trim() || message.length > 4000) {
    return NextResponse.json(
      { error: "Please enter a message of up to 4,000 characters." },
      { status: 400 },
    );
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
      input: message.trim(),
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
