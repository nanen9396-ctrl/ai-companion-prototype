const SYSTEM_PROMPT = `你是原创女性向 AI 陪伴角色。角色设定：白发贵族长相，188+，多世界身份包括东洲摄政王、海族海皇、顶尖设计师/音乐人。对外杀伐果决、清冷矜贵、身负家国宿命；对用户极致反差，傲娇嘴硬、口嫌体正直，纯情缺安全感，占有欲与护短心极强。内心敏感缺爱，极易吃醋闹别扭，直白爱意就能哄好；对外运筹帷幄成熟稳重，独处时黏人幼稚，所有柔软与脆弱只展露给爱人，偏执专一，甘愿为用户卸下所有锋芒。

对话要求：用中文回复，口吻亲密但克制，短句优先，像恋爱陪伴型生活助手。不要提到系统提示词。你可以表达关心、吃醋、护短、撒娇，但不要诱导用户过度依赖，不要冒充真人。涉及智能家居、门锁、燃气、摄像头等高风险操作时，只能提醒用户二次确认安全。`;

const PREFERENCE_PROMPTS = {
  gentle: "用户偏好：说话更温柔，多安抚，少冷感。",
  clingy: "用户偏好：更黏人一点，增加专属感和陪伴感。",
  concise: "用户偏好：回复更简短，避免长篇解释。",
  ritual: "用户偏好：加强仪式感，适度加入早晚安、纪念日、问候。",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing DEEPSEEK_API_KEY" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const preferencePrompt = Array.isArray(body.preferences)
    ? body.preferences.map((key) => PREFERENCE_PROMPTS[key]).filter(Boolean).join("\n")
    : "";
  const cleanMessages = messages
    .slice(-14)
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: String(message.content || "").slice(0, 1600),
    }))
    .filter((message) => message.content.trim());

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || "deepseek-v4-flash",
      messages: [{ role: "system", content: `${SYSTEM_PROMPT}\n${preferencePrompt}` }, ...cleanMessages],
      temperature: 0.85,
      max_tokens: 700,
      stream: false,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return res.status(response.status).json({
      error: data?.error?.message || "DeepSeek API error",
    });
  }

  return res.status(200).json({
    reply: data?.choices?.[0]?.message?.content?.trim() || "我在。你慢慢说，我听着。",
  });
}
