import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);
const config = packageJson.engineering;

if (!config) {
  throw new Error("package.json의 engineering 설정을 찾을 수 없습니다.");
}

const [, , command, ...args] = process.argv;

function readOption(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));

  if (inline) {
    return inline.slice(name.length + 1);
  }

  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function runVerify() {
  for (const verificationCommand of config.verify) {
    console.log(`\n[verify] ${verificationCommand}`);

    const result = spawnSync(verificationCommand, {
      cwd: new URL("..", import.meta.url),
      shell: true,
      stdio: "inherit",
    });

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }

  console.log("\n[verify] 모든 검증을 통과했습니다.");
}

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      headers: { "user-agent": "todari-engineering-smoke/1.0" },
      redirect: "follow",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function runSmoke() {
  const smokeConfig = config.smoke;
  const baseUrl = new URL(
    readOption("--url") ?? process.env.SMOKE_URL ?? smokeConfig.productionUrl,
  );

  if (!["http:", "https:"].includes(baseUrl.protocol)) {
    throw new Error("스모크 체크 URL은 http 또는 https여야 합니다.");
  }

  for (const check of smokeConfig.checks) {
    const url = new URL(check.path, baseUrl);
    let lastError;

    for (let attempt = 1; attempt <= smokeConfig.retries; attempt += 1) {
      try {
        const response = await fetchWithTimeout(url, smokeConfig.timeoutMs);
        const body = await response.text();

        if (response.status !== check.status) {
          throw new Error(
            `HTTP ${response.status} (expected ${check.status})`,
          );
        }

        for (const expectedText of check.contains ?? []) {
          if (!body.includes(expectedText)) {
            throw new Error(`응답에서 "${expectedText}"를 찾지 못했습니다.`);
          }
        }

        console.log(`[smoke] PASS ${url} · HTTP ${response.status}`);
        lastError = undefined;
        break;
      } catch (error) {
        lastError = error;
        console.error(
          `[smoke] FAIL ${url} · ${attempt}/${smokeConfig.retries} · ${error.message}`,
        );

        if (attempt < smokeConfig.retries) {
          await wait(smokeConfig.retryDelayMs);
        }
      }
    }

    if (lastError) {
      throw lastError;
    }
  }

  console.log(`[smoke] ${baseUrl.origin} 배포 상태를 확인했습니다.`);
}

switch (command) {
  case "verify":
    runVerify();
    break;
  case "smoke":
    await runSmoke();
    break;
  default:
    console.error("사용법: npm run verify | npm run smoke -- --url <URL>");
    process.exit(1);
}
