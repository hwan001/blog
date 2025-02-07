+++
title = '코드 파일 확장자별 차이 (ts, tsx, js, jsx)'
date = 2025-01-20T16:27:43+09:00
draft = false
categories = ["posting", "nextjs"]
descriptions = ""
+++

Next.js에서 JavaScript와 TypeScript의 확장자인 .js, .jsx, .ts, .tsx는 파일 내용과 용도에 따라 구분됩니다. 

1. .js (JavaScript 파일)
- 용도: 기본 JavaScript 파일.
- 특징:
    - 순수 JavaScript 코드만 포함.
    - TypeScript 타입 검사나 JSX 문법을 지원하지 않음.
    - 일반적으로 Next.js의 설정 파일(next.config.js 등)이나 유틸리티 파일로 사용.
- 예제:
    ```js
    function add(a, b) {
      return a + b;
    }

    module.exports = add;
    ```

2. .jsx (JavaScript + JSX 파일)
- 용도: JavaScript 코드에서 JSX 문법을 사용하는 경우.
- 특징:
    - React 컴포넌트를 작성할 때 주로 사용.
    - JSX 문법( `<div> Hello </div>` )을 포함할 수 있음.
    - TypeScript 타입 검사를 지원하지 않음.
- 예제:
    ```js
    export default function Component() {
      return <h1>Hello, JSX!</h1>;
    }
    ```

3. .ts (TypeScript 파일)
- 용도: TypeScript를 사용하는 순수 스크립트 파일.
- 특징:
    - JavaScript의 상위 집합인 TypeScript 코드를 작성할 때 사용.
    - 타입 검사 및 정적 타입 시스템을 지원.
    - JSX 문법을 사용할 수 없음.
    - 주로 유틸리티 함수, API 함수, 또는 타입 정의 파일로 사용.
- 예제: 
    ```ts
    type User = {
      id: number;
      name: string;
    };
    
    function greet(user: User): string {
      return `Hello, ${user.name}`;
    }

    export default greet;
    ```

4. .tsx (TypeScript + JSX 파일)
- 용도: TypeScript와 JSX 문법을 사용하는 경우.
- 특징:
    - React 컴포넌트를 작성하면서 TypeScript의 타입 검사 기능을 활용.
    - JSX 문법(`<div>Hello</div>`)과 함께 타입을 명시할 수 있음.
    - Next.js에서 TypeScript 기반의 컴포넌트를 작성할 때 주로 사용.
- 예제:
    ```tsx
    type Props = {
      message: string;
    };

    export default function Component({ message }: Props) {
      return <h1>{message}</h1>;
    }
    ```

파일 확장자 비교 요약

|확장자|사용 언어|JSX 문법|TypeScript 지원|주요 용도|
|:---|:---:|:---:|:---:|:---|
|.js|JavaScript|❌|❌|순수 JS 코드, 설정 파일|
|.jsx|JavaScript|✅|❌|React 컴포넌트 작성|
|.ts|TypeScript|❌|✅|타입 지정이 필요한 JS 파일|
|.tsx|TypeScript|✅|✅|React 컴포넌트(TypeScript 기반)|
||||||


### Next.js에서 각 확장자의 사용 사례
1. .js:
    - Next.js 설정 파일 (next.config.js, babel.config.js 등).
    - 비React 관련 유틸리티 함수 작성.
2. .jsx:
    - JavaScript 기반 프로젝트에서 React 컴포넌트 작성.
3.	.ts:
    - TypeScript 기반 프로젝트에서 타입 정의, API 로직, 유틸리티 함수 작성.
4.	.tsx:
    - TypeScript 기반 프로젝트에서 React 컴포넌트 작성.

### 결론
- JS와 TS 선택: 타입 안정성을 원한다면 TypeScript를 선택하고, 그렇지 않다면 JavaScript를 사용.
- JSX vs TSX: React 컴포넌트를 작성할 때는 프로젝트의 언어 설정에 따라 .jsx나 .tsx를 사용.
