+++
title = 'Styled Components'
date = 2025-01-20T16:14:47+09:00
draft = false
categories = ["posting", "nextjs"]
descriptions = ""
+++


아래는 Next.js에서 Styled Components를 사용하는 간단한 예제입니다. Styled Components는 CSS-in-JS 라이브러리로, 스타일을 컴포넌트 내부에 작성할 수 있습니다.

1. Styled Components 설치

먼저 Styled Components와 Babel 플러그인을 설치해야 합니다.

```bash
npm install styled-components
npm install --save-dev babel-plugin-styled-components
```

2. .babelrc 파일 설정

Styled Components를 제대로 사용하려면 Babel 설정을 추가해야 합니다. Next.js 프로젝트에 .babelrc 파일을 생성하고 다음과 같이 설정합니다.
```json
{
  "presets": ["next/babel"],
  "plugins": ["babel-plugin-styled-components"]
}
```

3. 기본 사용 예제

아래는 Styled Components를 사용해 Next.js에서 간단한 버튼 컴포넌트를 작성하고 사용하는 방법입니다.

pages/_document.js 설정 (SSR 지원을 위해 필요)

Styled Components를 서버사이드 렌더링(SSR)과 함께 사용하려면 pages/_document.js 파일을 추가해야 합니다.

```ts
import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
```
components/Button.js

다음은 Styled Components로 작성한 버튼 컴포넌트입니다.
```ts
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => (props.primary ? "#0070f3" : "#eaeaea")};
  color: ${(props) => (props.primary ? "white" : "black")};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => (props.primary ? "#005bb5" : "#cacaca")};
  }
`;

export default function Button({ children, primary }) {
  return <StyledButton primary={primary}>{children}</StyledButton>;
}
```
pages/index.js

버튼 컴포넌트를 사용하여 렌더링하는 페이지입니다.

```ts
import Button from "../components/Button";

export default function Home() {
  return (
    <div>
      <h1>Styled Components with Next.js</h1>
      <Button primary>Primary Button</Button>
      <Button>Default Button</Button>
    </div>
  );
}
```

4. 실행

이제 Next.js 애플리케이션을 실행하면 Primary Button과 Default Button이 서로 다른 스타일로 렌더링됩니다.

```
npm run dev
``` 

Styled Components를 사용하면 컴포넌트 기반 스타일링이 매우 간편해지며, 동적 스타일링과 재사용성을 손쉽게 구현할 수 있습니다.