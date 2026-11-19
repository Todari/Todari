export interface WorkExperience {
  id: string;
  category: string;
  title: string;
  problem: string;
  change: string;
  verification?: string;
  sources: readonly { label: string; href: string }[];
}

export const workExperiences = {
  haengdong: [
    {
      id: "accessibility",
      category: "접근성 개선",
      title: "키보드와 스크린리더로도 슬라이드를 탐색할 수 있게",
      problem: "Tab으로 옮긴 포커스가 화면에 드러나지 않는 곳이 있었습니다. 코드 리뷰에서는 슬라이드가 바뀌어도 스크린리더가 그 변경을 읽을 수 있는지 확인해야 한다는 질문이 나왔습니다.",
      change: "공통 포커스 표시를 추가하고 Carousel에 좌우 방향키 이동을 넣었습니다. 슬라이드가 바뀔 때는 aria-live 영역으로 변경을 알리고, BottomSheet 안에서는 Tab 포커스가 시트 내부를 순환하도록 했습니다.",
      sources: [
        { label: "#982 · 접근성 검수 이슈", href: "https://github.com/woowacourse-teams/2024-haeng-dong/issues/982" },
        { label: "#984 · Carousel과 BottomSheet 개선 PR", href: "https://github.com/woowacourse-teams/2024-haeng-dong/pull/984" },
        { label: "슬라이드 변경 안내에 대한 리뷰", href: "https://github.com/woowacourse-teams/2024-haeng-dong/pull/984#discussion_r1938219295" },
      ],
    },
    {
      id: "mobile-keyboard",
      category: "모바일 버그 수정",
      title: "가상 키보드가 지출 편집 항목을 가리던 문제 해결",
      problem: "모바일에서 지출 항목을 선택하면 특정 화면 높이에서 가상 키보드가 선택한 항목을 덮었습니다. 기존 스크롤 계산은 키보드 높이를 고정값으로 가정했습니다.",
      change: "가상 키보드 요소의 실제 위치인 offsetTop을 기준으로 스크롤 거리를 계산해, 선택한 항목이 키보드 위에 보이도록 수정했습니다.",
      sources: [
        { label: "#744 · 모바일 지출 편집 버그 이슈", href: "https://github.com/woowacourse-teams/2024-haeng-dong/issues/744" },
        { label: "#802 · 가상 키보드 위치 계산 수정 PR", href: "https://github.com/woowacourse-teams/2024-haeng-dong/pull/802" },
      ],
    },
    {
      id: "error-tracking",
      category: "운영 개선",
      title: "Sentry 오류 추적을 도입하고 인앱 브라우저 잡음을 줄이기",
      problem: "클라이언트 오류 추적 코드가 비활성화돼 있었고, 서버에도 Sentry 수집 경로가 없었습니다. 도입 후에는 일부 iOS 인앱 브라우저가 주입하는 예외도 앱 오류와 함께 들어왔습니다.",
      change: "React 클라이언트의 Sentry를 활성화하고 NestJS 서버에서 5xx와 처리되지 않은 예외를 수집했습니다. iOS에서 주입된 window.webkit.messageHandlers 예외 패턴은 클라이언트 수집 대상에서 제외했습니다.",
      sources: [
        { label: "Todari #2 · 클라이언트·서버 Sentry 도입 PR", href: "https://github.com/Todari/2024-haeng-dong/pull/2" },
        { label: "Todari #7 · iOS 인앱 브라우저 예외 필터 PR", href: "https://github.com/Todari/2024-haeng-dong/pull/7" },
      ],
    },
  ],
  forcletter: [
    {
      id: "native-web-compatibility",
      category: "앱·웹 호환",
      title: "업데이트 순서가 달라도 앱과 웹의 버튼이 겹치지 않게",
      problem: "아이폰의 넓은 화면에서 네이티브 탭과 웹의 빠른 실행 버튼이 같은 공간을 차지했습니다. 앱 업데이트와 웹 배포는 사용자에게 서로 다른 시점에 도착합니다.",
      change: "앱에서 계산한 사이드바 폭과 버튼 위치를 CSS 변수로 전달했습니다. 새 웹에는 이전 위치 계산을 남기고, 새 앱은 기존 웹이 읽는 변수도 전달하도록 했습니다.",
      verification: "앱 테스트 58개와 듀오·일반 아이폰 시뮬레이터를 확인했습니다. App Store 0.1.10 출시 노트에도 화면 대응이 기록돼 있습니다.",
      sources: [
        { label: "기술 글 · 앱·웹 레이아웃 호환 설계", href: "/writing/native-web-layout-compatibility" },
        { label: "App Store · 공개 출시 기록", href: "https://apps.apple.com/kr/app/id6758508512" },
      ],
    },
    {
      id: "poki-confirmation",
      category: "AI 에이전트 설계",
      title: "AI가 제안한 인스타그램 운영 작업에 승인 단계 넣기",
      problem: "대화로 DM 규칙이나 바이오 링크를 바꿀 수 있어도, 어떤 계정과 설정에 변경이 적용될지 실행 전에 확인할 필요가 있었습니다.",
      change: "포키가 대화에서 운영 작업을 준비하고 확인 카드를 보여 주도록 했습니다. 사용자가 변경 내용을 확인하고 승인하면 실제 설정을 반영합니다.",
      sources: [
        { label: "제품 소개 · 포키 확인 카드와 지원 작업", href: "https://forcreator.co.kr" },
      ],
    },
    {
      id: "snapshot-storage",
      category: "데이터 설계",
      title: "5,000만 행 규모로 늘어난 인스타그램 지표의 조회 구조 정리",
      problem: "과거 지표를 보기 위해 쌓은 스냅샷이 늘면서 통계 쿼리가 수천만 행의 JSON을 읽고 파싱했습니다.",
      change: "자주 쓰는 지표를 일반 컬럼으로 옮기고 기존 데이터를 백필했습니다. 게시물별 추이와 기간 집계에 각각 맞는 인덱스를 두고, 같은 수집 작업이 겹쳐 실행되지 않게 했습니다.",
      sources: [
        { label: "기술 글 · 스냅샷 스키마, 인덱스와 수집 운영 기록", href: "/writing/snapshot-50m-rows" },
      ],
    },
  ],
  jeongpyo: [
    {
      id: "face-value",
      category: "거래 설계",
      title: "판매자가 가격을 입력하지 않아도 정가가 정해지는 양도 흐름",
      problem: "판매자가 금액을 직접 입력하면, 정가 거래 정책을 안내하더라도 매물 등록 단계에서 웃돈을 붙일 수 있습니다.",
      change: "판매자는 경기와 좌석 등급을 고르고, 서버가 구장과 좌석에 맞는 구단 판매가로 성인 일반권 1매 가격을 계산하도록 설계했습니다.",
      verification: "공개 페이지에서 가격 산정 흐름과 잠실 베타 모집을 확인할 수 있습니다.",
      sources: [
        { label: "이정표 공개 소개 · 정가 산정과 양도 절차", href: "https://jeongpyo.com" },
      ],
    },
  ],
  geo: [
    {
      id: "aggregation-memory",
      category: "성능 개선",
      title: "반복되는 AI 답변 멘션을 공유해 집계 메모리 줄이기",
      problem: "같은 형태의 브랜드 멘션이 여러 답변에 반복됐고, 집계할 때마다 Node에서 같은 값의 객체를 여러 번 만들었습니다.",
      change: "DB에서 중복 값 목록과 답변별 ID 배열을 나눠 읽고, Node에서는 같은 ID가 같은 읽기 전용 객체를 참조하게 만들었습니다.",
      verification: "한 브랜드의 30일치 계산에서 1.97GB → 0.59GB를 기록했습니다. 메모리 지표와 환경은 당시 따로 기록되지 않았습니다.",
      sources: [
        { label: "기술 글 · 전후 측정 조건과 운영 데이터 결과 대조", href: "/writing/geo-aggregation-memory" },
      ],
    },
    {
      id: "cms-handoff",
      category: "콘텐츠 자동화",
      title: "AI 검색 개선안을 고객 CMS의 초안과 편집 할 일로 전달",
      problem: "AI 검색 보고서에서 개선 대상을 골라도 담당자가 원문과 브리프를 다시 찾아 편집 작업을 만들어야 했습니다.",
      change: "새 글은 CMS 초안, 기존 문서 보강은 할 일로 전달했습니다. 같은 개선안을 재전송해도 중복 작업이 생기지 않게 하고, 편집 상태를 돌려받도록 했습니다.",
      verification: "고객 CMS 배포까지 확인했습니다. 공개 URL 도달 여부와 검색 효과는 후속 검증 범위입니다.",
      sources: [
        { label: "설계 기록 · 고객 CMS 연동과 검증 범위", href: "/work/geo-seo-automation#customer-cms" },
      ],
    },
  ],
  dakbal: [
    {
      id: "mobile-map-controls",
      category: "모바일 버그 수정",
      title: "좁은 모바일 지도에서 영업 필터와 목록 버튼 잘림 해결",
      problem: "모바일에서 지도 하단 시트의 지점 요약과 영업 중 필터, 목록 버튼이 한 줄에 모여 마지막 버튼이 시트 경계를 넘었습니다.",
      change: "하단 시트에서 지점 요약과 조작 버튼을 나눠 배치하는 구간을 넓히고, 접힌 상태에서도 제어 영역이 보이도록 높이를 확보했습니다.",
      sources: [
        { label: "공개 서비스 · 모바일 지도 하단의 영업 필터와 목록", href: "https://dakbal.pro" },
      ],
    },
  ],
  metronomdeul: [
    {
      id: "first-beat",
      category: "동기화 버그 수정",
      title: "방에서 재생을 누른 사람의 첫 박자 튐 해결",
      problem: "서버가 재생 요청을 받은 시각을 기준으로 박자를 잡아, 재생을 누른 기기에서는 첫 두 클릭 사이가 업로드 지연만큼 늘었습니다.",
      change: "재생을 누른 기기의 첫 박 시각을 서버 시계로 변환해 전달하고, 서버가 허용 범위 안의 값을 박자 기준으로 쓰도록 했습니다. 초기 시계 보정이 끝난 뒤 최신 방 상태를 다시 요청합니다.",
      verification: "가상 시계를 쓰는 회귀 테스트에서 첫 박부터 서버 박자와 맞는지 확인했습니다.",
      sources: [
        { label: "#12 · 첫 박 동기화와 재생 멈춤 수정 PR", href: "https://github.com/Todari/metro-nomedeul/pull/12" },
        { label: "기술 글 · 서버 시계 보정과 Web Audio 스케줄링", href: "/writing/metronome-clock-sync" },
      ],
    },
    {
      id: "ios-audio-resume",
      category: "모바일 버그 수정",
      title: "iOS에서 오디오 재개 대기 때문에 재생 버튼이 멈추는 문제 해결",
      problem: "iOS가 화면 터치 없이 호출된 오디오 재개 요청을 처리하지 않으면, 초기화 상태가 계속 남아 재생 버튼이 응답하지 않았습니다.",
      change: "오디오 재개 대기에 상한을 두고, 기기에서 오디오를 시작할 수 없는 동안에도 방의 재생 요청은 서버로 전달되도록 분리했습니다.",
      sources: [
        { label: "#12 · iOS 재생 대기 경로와 회귀 테스트 PR", href: "https://github.com/Todari/metro-nomedeul/pull/12" },
      ],
    },
  ],
  "pin-to-gather": [
    {
      id: "live-itinerary",
      category: "기능 구현",
      title: "여행 일정과 방문 완료를 함께 보는 실시간 보드 구현",
      problem: "장소 후보를 지도에 공유해도 여행 당일 방문 순서와 다음 목적지, 완료한 장소를 각자 다시 확인해야 했습니다.",
      change: "핀을 날짜와 방문 순서에 배치하고, 오늘 모드에 진행률과 다음 장소, 네이버 지도 길찾기를 넣었습니다. 일정과 방문 완료 상태를 WebSocket으로 공유합니다.",
      verification: "두 사용자의 일정·방문 완료 동기화와 연결 복구를 브라우저 테스트에 포함했습니다.",
      sources: [
        { label: "커밋 · 실시간 일정과 오늘 모드 구현", href: "https://github.com/Todari/pin-to-gather/commit/a9d40c31e32199279c8d8e6f94d640c14a2ef6b1" },
        { label: "README · 여행 일정 화면과 브라우저 검증 범위", href: "https://github.com/Todari/pin-to-gather#검증" },
      ],
    },
  ],
  "react-pixel-ui": [
    {
      id: "stable-pixel-wrapper",
      category: "렌더링 버그 수정",
      title: "픽셀 그림자가 바뀔 때 React 자식 요소가 다시 마운트되는 문제 해결",
      problem: "픽셀 그림자가 생기거나 없어질 때 래퍼 구조가 바뀌면 React가 안쪽 요소를 다시 마운트할 수 있었습니다.",
      change: "그림자 래퍼를 유지해 자식 DOM의 위치를 고정했습니다. 마운트 시 크기가 0인 요소는 ResizeObserver로 다시 측정합니다.",
      sources: [
        { label: "#6 · React 렌더링 안정화와 코어 수정 PR", href: "https://github.com/Todari/react-pixel-ui/pull/6" },
      ],
    },
    {
      id: "compressed-pixel-output",
      category: "출력 최적화",
      title: "픽셀 PNG를 압축하고 쓰지 않는 이미지 생성 생략",
      problem: "픽셀 표현에 쓰는 PNG 데이터 URL이 커졌고, 호출자가 쓰지 않는 PNG까지 매번 만들었습니다.",
      change: "PNG 인코더에 DEFLATE 압축을 적용하고, 호출자가 필요한 이미지 종류만 요청할 수 있도록 했습니다.",
      sources: [
        { label: "#6 · PNG 인코더와 출력 옵션 변경 PR", href: "https://github.com/Todari/react-pixel-ui/pull/6" },
      ],
    },
  ],
  "trade-tower": [
    {
      id: "fixed-test-clock",
      category: "테스트 안정화",
      title: "실행 날짜가 바뀌면 깨지던 시세 조회 테스트 수정",
      problem: "지수 일봉 조회는 오늘 날짜를 기준으로 시작일을 계산했습니다. 테스트는 고정된 날짜를 기대해 같은 코드도 실행하는 날짜에 따라 실패했습니다.",
      change: "페이징 테스트가 사용하는 시계를 고정해 매번 같은 조회 구간에서 페이지 이동을 검증하도록 했습니다.",
      sources: [],
    },
  ],
  hgt: [
    {
      id: "active-weekly-matching",
      category: "매칭 개선",
      title: "오래 접속하지 않은 계정이 주간 매칭을 차지하던 문제 개선",
      problem: "탐색을 켠 채 오래 접속하지 않은 계정이 매칭 후보에 남아, 활동 중인 사용자가 그 주에 응답을 받기 어려울 수 있었습니다.",
      change: "주간 후보를 불러올 때 최근 활동 시각을 확인하고, 설정된 비활성 기간을 넘긴 계정을 후보에서 제외하도록 했습니다.",
      verification: "기본 기준인 21일을 적용했을 때 30일 미접속 계정이 후보에서 빠지는 것을 확인했습니다.",
      sources: [
        { label: "커밋 · 주간 매칭 후보에서 장기 미접속 계정 제외", href: "https://github.com/Todari/hgt/commit/63d639342eebe2d37c55a2b2bab9a0ef1f4ca987" },
      ],
    },
  ],
  toksai: [
    {
      id: "focused-group-analysis",
      category: "기능 구현",
      title: "카카오톡 단체방에서 두 사람을 골라 관계 분석",
      problem: "단체방 대화에는 여러 사람이 섞여 있어, 관계를 보고 싶은 두 사람이 누구인지 분석 흐름에 넘겨야 했습니다.",
      change: "대화 파일을 읽은 뒤 본인과 상대를 선택하는 단계를 추가했습니다. 선택한 두 사람을 중심으로 통계를 계산하고 분석용 대화 문맥을 구성합니다.",
      sources: [
        { label: "커밋 · 단체방 참여자 선택, 통계와 분석 흐름 구현", href: "https://github.com/Todari/toksai/commit/4047ccd55fa8cd2d3e557be8e13d717fecd372b6" },
      ],
    },
  ],
  lovetype: [
    {
      id: "static-type-results",
      category: "검색·공유 개선",
      title: "연애 유형 16종을 각각 열 수 있는 공개 결과 페이지로 전환",
      problem: "결과를 브라우저에서 계산하는 흐름만으로는 유형별 설명을 고유 주소로 공유하고 검색에서 발견하기 어려웠습니다.",
      change: "16개 유형 페이지를 정적으로 생성하고, 유형별 대표 URL과 구조화 데이터를 추가했습니다. 사이트맵과 공유 기준 도메인도 lvti.my로 통일했습니다.",
      sources: [
        { label: "커밋 · 유형별 정적 페이지와 검색 메타데이터 추가", href: "https://github.com/Todari/lovetype/commit/4c3bfd05f8d8c7ff58746d71ab109f485dfe377f" },
      ],
    },
  ],
} satisfies Record<string, readonly [WorkExperience, ...WorkExperience[]]>;
