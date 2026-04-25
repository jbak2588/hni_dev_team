# Email Finance Tracker

이 앱은 Gmail 결제 알림 메일을 자동으로 분석하여 지출과 수입을 관리해주는 웹 애플리케이션입니다. **Gemini 1.5 Pro**를 사용하여 메일 본문에서 정확한 결제 정보를 추출합니다.

## 프로젝트 구조
- `backend/`: Express (TypeScript) 서버, SQLite 데이터베이스, Gmail/Gemini 연동 로직
- `frontend/`: React (Vite, Tailwind CSS) 대시보드

## 시작하기 전 준비사항
1. **Google Cloud Console**: 
   - 프로젝트 생성 후 Gmail API 활성화
   - OAuth 2.0 클라이언트 ID 및 보안 비밀번호(Secret) 생성
   - 승인된 리디렉션 URI에 `http://localhost:3001/api/auth/google/callback` 추가
2. **Gemini API Key**: [Google AI Studio](https://aistudio.google.com/)에서 API 키 발급

## 실행 방법

### 1. 백엔드 설정
```bash
cd backend
# 패키지 설치 (npm 또는 bun)
npm install 
# 또는
bun install

# .env 파일 생성 및 값 설정
cp .env.example .env
# .env 파일에 GEMINI_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET 등을 입력하세요.

# 서버 실행
npm run dev
```

### 2. 프론트엔드 설정
```bash
cd frontend
# 패키지 설치
npm install
# 또는
bun install

# 앱 실행
npm run dev
```

## 주요 기능
- **Gmail 연동**: "Connect Gmail" 버튼으로 계정 연결
- **자동 동기화**: "Sync Gmail" 버튼을 누르면 최근 결제 메일을 가져와 Gemini AI가 분석 및 저장
- **대시보드**: 지출/수입 통계 요약 및 차트 시각화
- **내역 관리**: 분석된 모든 거래 내역 리스트 확인
