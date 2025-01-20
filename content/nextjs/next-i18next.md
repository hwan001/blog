+++
title = 'next-i18next로 다국어 지원하기'
date = 2025-01-20T15:00:18+09:00
# draft = true
+++


Next.js에서 next-i18next를 사용하여 다국어 지원을 구현하는 방법과 효율적인 프로젝트 구조를 아래에 설명합니다.

1. next-i18next 설치
```bash
npm install next-i18next react-i18next i18next
```

2. 프로젝트 구조

다국어 지원을 위해 프로젝트 구조를 다음과 같이 설정하는 것이 효율적입니다:
```
my-project/
├── public/
│   └── locales/
│       ├── en/
│       │   ├── common.json
│       │   ├── home.json
│       ├── ko/
│       │   ├── common.json
│       │   ├── home.json
├── src/
│   ├── components/
│   │   └── Header.js
│   ├── pages/
│   │   ├── index.js
│   │   ├── about.js
│   ├── i18n.js
│   ├── _app.js
│   ├── next-i18next.config.js
```

3. next-i18next 설정
    1) next-i18next.config.js

    Next.js의 설정 파일입니다. 이 파일은 i18next에 필요한 기본 옵션을 정의합니다.
    ```js
    module.exports = {
      i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ko'], // 지원할 언어들
        localeDetection: true, // 브라우저 언어 감지
      },
    };
    ```

    2) src/i18n.js

    i18n 초기화를 위한 파일입니다.
    ```js
    import { appWithTranslation } from 'next-i18next';
    import nextI18NextConfig from './next-i18next.config';

    export default appWithTranslation(nextI18NextConfig);
    ```

4. 다국어 JSON 파일 작성

다국어 텍스트를 JSON 파일로 관리합니다. public/locales 디렉터리 구조는 다음과 같습니다.

public/locales/en/common.json
```json
{
  "welcome": "Welcome to our site!",
  "header": {
    "home": "Home",
    "about": "About"
  }
}
```

public/locales/ko/common.json
```json
{
  "welcome": "우리 사이트에 오신 것을 환영합니다!",
  "header": {
    "home": "홈",
    "about": "소개"
  }
}
```

5. 다국어 텍스트 사용

다음은 다국어 텍스트를 페이지에서 사용하는 방법입니다.

src/pages/index.js
```ts
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation('common'); // 'common.json' 파일 사용

  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
```

6. 헤더 또는 공통 컴포넌트에서 다국어 스위치 추가

다국어를 변경할 수 있는 UI를 추가합니다.

src/components/Header.js
```js
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  const changeLanguage = (lang) => {
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <header>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ko')}>한국어</button>
    </header>
  );
}
```

src/pages/_app.js

_app.js에서 헤더를 포함하도록 설정합니다.
```js
import Header from '../components/Header';
import i18n from '../i18n';

function MyApp({ Component, pageProps }) {
  return (
    <i18n>
      <Header />
      <Component {...pageProps} />
    </i18n>
  );
}

export default i18n(MyApp);
```

7. 효율적인 프로젝트 관리 팁
	1.	JSON 파일 분리:
	    - 페이지별로 JSON 파일을 분리 (common.json, home.json, about.json 등)하여 관리.
	    - 변경사항 추적이 쉬워지고, 각 페이지에 필요한 번역만 로드하므로 성능도 향상됩니다.
	2.	공통 키 관리:
	    - 반복적으로 사용되는 텍스트(header, footer)는 common.json으로 중앙 관리.
	3.	자동화 도구 사용:
	    - 번역 관리 도구(Lokalise, Phrase, Crowdin)를 사용해 협업 효율을 높임.
	4.	브라우저 언어 감지:
	    - localeDetection 옵션을 활성화하여 사용자 경험을 개선.

위 구조와 설정을 적용하면 next-i18next를 효율적으로 사용하여 다국어 지원을 구현할 수 있습니다.