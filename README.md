<div align="center">

<a href="https://todari.dev">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:dfff4f,35:67e8f9,70:ff79bd,100:a78bfa&height=190&section=header&text=Todari&fontColor=17151c&fontSize=54&fontAlignY=38&desc=PRODUCT%20ENGINEER%20%C2%B7%20SERVICE%20BUILDER&descAlignY=61&descSize=13" width="100%" alt="Todari — Product Engineer · Service Builder" />
</a>

크리에이터가 게시물 성과를 확인하고 협찬을 관리하는 **포크레터**를 개발·운영합니다.

[![Portfolio](https://img.shields.io/badge/ENTER_TODARI.DEV-dfff4f?style=for-the-badge&labelColor=17151c&logo=vercel&logoColor=fffaf0)](https://todari.dev)
[![Email](https://img.shields.io/badge/HELLO%40TODARI.DEV-ff79bd?style=for-the-badge&labelColor=17151c&logo=gmail&logoColor=fffaf0)](mailto:hello@todari.dev)

</div>

## 포크레터에서 내린 설계 결정

**게시물 12개의 최신 지표를 읽는데 왜 5,845행을 정렬할까?** 처음에는 피드·릴스마다 지표 종류가 달라 한 시점의 값을 JSON에 담았습니다. SQL 집계가 필요해지자 도달·좋아요를 숫자 컬럼으로 옮기고, 기존 앱에는 같은 형태의 응답을 돌려줬습니다. 이후 스냅샷이 약 4,800만 행까지 쌓이면서 목록 조회 방식도 바꿨습니다. 게시물별 최신 시각을 인덱스에서 먼저 찾자, 같은 게시물 12개를 조회하는 실행계획에서 인덱스 항목 115개와 본문 행 12개를 읽었습니다. [저장 모델과 쿼리 전후 비교](https://todari.dev/writing/snapshot-50m-rows)

**댓글 수집을 화면 API에서 분리한 뒤에도 배포 중 수집이 끊겼습니다.** 계정 115개를 도는 데 25분이 걸렸고 다음 수집은 5분마다 시작됐습니다. 겹치는 회차를 건너뛰게 해도 화면 요청과 DB 연결 풀을 공유해 수집을 전용 워커로 옮겼습니다. 이번에는 스케줄러가 교체 중인 워커를 호출했습니다. 새 워커의 준비를 확인한 뒤 스케줄러를 전환하고, 전환에 실패하면 이전 주소와 이미지로 돌아가도록 배포 순서를 바꿨습니다. [워커 교체 순서와 실패 조건 검증](https://todari.dev/writing/bluegreen-on-one-ec2#collector-cutover)

**광고 단가 모델에서 무엇을 정답으로 삼을까?** 학습에 쓸 수 있던 가격은 크리에이터가 입력한 희망가였습니다. 같은 계정이 학습과 평가 양쪽에 들어가지 않게 계정별로 나눠 오차를 측정했습니다. 팔로워 10만 이상은 7월 정제 표본이 16계정뿐이어서, 협상 화면에는 별도 시장 기준을 섞고 모델 평가는 희망가에 대해 수행했습니다. [표본 분포와 제안가 계산](https://todari.dev/writing/creator-price-estimates)

## 다른 프로젝트에서 해결한 문제

- **AiBright · AI 검색 답변 집계** — 같은 브랜드명이 한 답변에 두 번 나오면 집계에도 두 번 남아야 합니다. SQL에서 같은 멘션 값에 ID를 부여하고 답변마다 등장 순서대로 ID를 담아, Node에서는 같은 객체를 재사용했습니다. 한 브랜드의 30일치 약 75만 건을 집계할 때 메모리 관측값이 1.97GB에서 0.59GB로 줄었습니다. [집계 결과와 메모리 비교](https://todari.dev/writing/geo-aggregation-memory)
- **메트로놈들 · 기기 간 박자 동기화** — 재생을 누른 기기는 이미 첫 박을 울렸는데, 서버가 요청을 받은 시각부터 다음 박을 세면서 첫 간격만 늘어졌습니다. 첫 박의 시각을 서버 시계로 환산해 방 전체가 쓰도록 했습니다. 120 BPM에 업로드 지연 120ms를 준 가상 시계에서 첫 두 박의 예약 간격이 619ms에서 500ms로 돌아왔습니다. [가상 시계 실험](https://todari.dev/writing/metronome-clock-sync) · [구현 PR](https://github.com/Todari/metro-nomedeul/pull/12)
- **행동대장 · 원 단위 차등 정산** — 사용자 테스트에서 한 지출 안에 직접 정한 몫과 균등하게 나눌 몫이 함께 필요하다는 걸 확인했습니다. 10,000원 중 한 사람이 2,001원을 고정하면 나머지 두 사람에게 3,999원과 4,000원을 배정합니다. 한 사람만 미고정이면 그 몫은 총액으로 결정되므로, 다른 사람이 금액을 고칠 때마다 자동으로 다시 계산하게 했습니다. [분배 규칙과 검증](https://todari.dev/work/haengdong#bill-allocation) · [팀 프로젝트 구현 PR](https://github.com/woowacourse-teams/2024-haeng-dong/pull/594)

## 전체 프로젝트

<details>
<summary>서비스와 공개 프로젝트 12개 보기</summary>

<div align="center">

<a href="https://forcreator.co.kr"><img height="32" src="https://img.shields.io/badge/01_FORCLETTER-인스타그램·유튜브_크리에이터_운영_도구-3b82f6?style=for-the-badge&labelColor=17151c" alt="01 Forcletter — 인스타그램·유튜브 크리에이터 운영 도구" /></a><br />
<a href="https://jeongpyo.com"><img height="32" src="https://img.shields.io/badge/02_이정표-KBO_티켓_팬투팬_정가_양도-3150ff?style=for-the-badge&labelColor=17151c" alt="02 이정표 — KBO 티켓 팬투팬 정가 양도" /></a><br />
<a href="https://aibright.ai"><img height="32" src="https://img.shields.io/badge/03_AIBRIGHT-AI_검색_관측과_GEO·SEO_개선_자동화-0e7490?style=for-the-badge&labelColor=17151c" alt="03 AiBright — AI 검색 관측과 GEO·SEO 개선 자동화" /></a><br />
<a href="https://dakbal.pro"><img height="32" src="https://img.shields.io/badge/04_닭발_헌터-엽떡_닭발_판매_지점_지도-e11d48?style=for-the-badge&labelColor=17151c" alt="04 닭발 헌터 — 엽떡 닭발 판매 지점 지도" /></a><br />
<a href="https://haengdong.todari.dev"><img height="32" src="https://img.shields.io/badge/05_행동대장-가입_없는_모임_정산-a855f7?style=for-the-badge&labelColor=17151c" alt="05 행동대장 — 가입 없는 모임 정산" /></a><br />
<a href="https://metronome.todari.dev"><img height="32" src="https://img.shields.io/badge/06_메트로놈들-실시간_협업_메트로놈-f97316?style=for-the-badge&labelColor=17151c" alt="06 메트로놈들 — 실시간 협업 메트로놈" /></a><br />
<a href="https://pintogather.todari.dev"><img height="32" src="https://img.shields.io/badge/07_핀투게더-친구들과_함께_만드는_여행_계획_지도-0f9f76?style=for-the-badge&labelColor=17151c" alt="07 핀투게더 — 친구들과 함께 만드는 여행 계획 지도" /></a><br />
<a href="https://react-pixel-ui.vercel.app"><img height="32" src="https://img.shields.io/badge/08_REACT_PIXEL_UI-CSS를_픽셀_아트로_바꾸는_UI_라이브러리-ec4899?style=for-the-badge&labelColor=17151c" alt="08 React Pixel UI — CSS를 픽셀 아트로 바꾸는 UI 라이브러리" /></a><br />
<a href="https://trade-tower.vercel.app"><img height="32" src="https://img.shields.io/badge/09_TRADE_TOWER-틱_기반_자동매매_운영_시스템-6366f1?style=for-the-badge&labelColor=17151c" alt="09 Trade Tower — 틱 기반 자동매매 운영 시스템" /></a><br />
<a href="https://hgt.todari.dev"><img height="32" src="https://img.shields.io/badge/10_HGT-홍익대_구성원_주간_1대1_매칭-8b5cf6?style=for-the-badge&labelColor=17151c" alt="10 HGT — 홍익대 구성원 주간 1대1 매칭" /></a><br />
<a href="https://toksai.todari.dev"><img height="32" src="https://img.shields.io/badge/11_톡사이-카카오톡_관계_신호_분석-ca8a04?style=for-the-badge&labelColor=17151c" alt="11 톡사이 — 카카오톡 관계 신호 분석" /></a><br />
<a href="https://lvti.my"><img height="32" src="https://img.shields.io/badge/12_LVTI-16가지_연애_성격_유형_테스트-ef4444?style=for-the-badge&labelColor=17151c" alt="12 LVTI — 16가지 연애 성격 유형 테스트" /></a>

</div>

</details>

## 제품 운영과 기록

- 포크레터의 광고 릴스는 편마다 촬영·음성·편집 결과를 저장해 실패한 단계부터 재개합니다. 국내 타깃으로 다시 실행한 한 회차에서 소재 4편의 검토본 8개를 약 24분 만에 만들었습니다. [릴스 제작과 광고 실험](https://todari.dev/writing/marketing-reels-pipeline)
- AiBright에서 AI 검색 답변을 관측한 뒤 새 글은 CMS 초안으로, 기존 페이지 보강은 편집 할 일로 보냅니다. 같은 요청을 다시 보내면 이미 만든 작업을 돌려주고, 게시하면 반영 시각을 기록합니다. [GEO 관측과 CMS 편집 과정](https://todari.dev/work/geo-seo-automation)
- [전체 기술 글](https://todari.dev/writing) · [포크레터 제품 사례](https://todari.dev/work/forcletter) · [iOS 앱과 웹의 업데이트 시차](https://todari.dev/writing/native-web-layout-compatibility) · [우수타 EP9 · 신입 개발자 생존기](https://youtu.be/k1yPXmv8H6o)

## AI Development Harness

<div align="center">

<code>CONTEXT → AI BUILD → VERIFY → CI/CD → SMOKE → DISCORD OPS</code>

<br />

<sub>AI 세션에 컨텍스트를 주입하고, 로컬·CI에서 같은 검증을 돌리고, 배포·에러 신호를 Discord 운영으로 잇습니다. 실행은 사람의 승인을 거칩니다.</sub>

<br /><br />

[![Workspace AI Harness](https://img.shields.io/badge/WORKSPACE_AI_HARNESS-공개_코드-67e8f9?style=for-the-badge&labelColor=17151c)](https://github.com/Todari/workspace-ai-harness)
[![Todari Ops](https://img.shields.io/badge/TODARI_OPS-공개_코드-dfff4f?style=for-the-badge&labelColor=17151c)](https://github.com/Todari/todari-ops)

</div>

## Build kit

<div align="center">

[![Core tools](https://skillicons.dev/icons?i=ts,react,nextjs,threejs,nestjs,postgres,docker,aws,vercel,githubactions&theme=dark)](https://skillicons.dev)

</div>

## Signals

<div align="center">

<a href="https://github.com/Todari">
  <img height="170" src="https://github-readme-stats-todaris-projects.vercel.app/api?username=Todari&show_icons=true&count_private=true&include_all_commits=true&bg_color=272138&title_color=dfff4f&text_color=fffaf0&icon_color=ff79bd&hide_border=true&border_radius=14" alt="Todari GitHub stats" />
</a>
<a href="https://github.com/Todari">
  <img height="170" src="https://github-readme-stats-todaris-projects.vercel.app/api/top-langs/?username=Todari&layout=compact&langs_count=8&bg_color=272138&title_color=67e8f9&text_color=fffaf0&hide_border=true&border_radius=14" alt="Todari top languages" />
</a>

<br /><br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Todari/Todari/output/github-snake-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Todari/Todari/output/github-snake.svg" />
  <img alt="Todari contribution snake" src="https://raw.githubusercontent.com/Todari/Todari/output/github-snake-dark.svg" width="100%" />
</picture>

<br />

<a href="https://todari.dev">TODARI.DEV</a>
&nbsp;·&nbsp;
<a href="mailto:hello@todari.dev">HELLO@TODARI.DEV</a>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:a78bfa,35:ff79bd,70:67e8f9,100:dfff4f&height=100&section=footer" width="100%" alt="" />

</div>
