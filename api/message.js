// 응원 문장은 이 파일(서버)에만 둔다. 화면(index.html)에는 넣지 않는다.
const MESSAGES = [
  "오늘도 충분히 잘하고 있어요.",
  "천천히 가도 괜찮아요. 멈추지만 않으면 돼요.",
  "어제보다 한 걸음 더 나아간 것만으로도 대단해요.",
  "지금의 노력은 반드시 빛을 볼 거예요.",
  "실수해도 괜찮아요. 그만큼 배우고 있다는 뜻이에요.",
  "당신이 있어서 오늘이 더 든든해요.",
  "잠깐 쉬어 가도 돼요. 쉬는 것도 실력이에요.",
  "할 수 있어요. 이미 여기까지 왔잖아요.",
  "작은 시작이 큰 변화를 만들어요.",
  "오늘 하루도 스스로를 칭찬해 주세요.",
  "힘든 날일수록 당신은 더 단단해지고 있어요.",
  "완벽하지 않아도 충분히 멋져요.",
  "지금 이 순간에도 성장하고 있어요.",
  "걱정보다 당신의 가능성이 훨씬 커요.",
  "오늘의 당신을 진심으로 응원해요.",
];

const DEFAULT_NAME = "여러분";
const MAX_NAME_LENGTH = 20;

function pickName(req) {
  const raw = (req.body && req.body.name) || (req.query && req.query.name) || "";
  const name = String(raw).trim().slice(0, MAX_NAME_LENGTH);
  return name || DEFAULT_NAME;
}

module.exports = (req, res) => {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "허용되지 않는 요청 방식이에요." });
  }

  const name = pickName(req);
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ name, message, text: `${name}님, ${message}` });
};
