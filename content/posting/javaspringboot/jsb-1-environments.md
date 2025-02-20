+++
title = 'Java Spring Boot 개발 환경 설정하기'
date = 2025-02-17T13:40:36+09:00
draft = false
categories = ["posting", "Java Spring Boot"]
+++


1. vscode를 설치합니다.
2. 아래 Extensions 설치합니다.
    - Extension pack for JAVA
    - Spring Boot Extension pack
        - Spring Initializr Java Support
3. VSCode에서 'Ctrl(cmd) + Shift + P' 입력 후 Spring Initializr:Create ~~ project ... 로 프로젝트 생성

```plain
# maven 프로젝트 구조
spring-boot-app/
│── src/
│   ├── main/java/com/example/demo/  (Java 코드)
│   ├── main/resources/               (설정 파일)
│   │   ├── application.properties
│   │   ├── static/                    (정적 파일)
│   │   ├── templates/                  (템플릿 파일)
│   ├── test/java/com/example/demo/  (테스트 코드)
│── pom.xml  (Maven 프로젝트 설정 파일)  // Maven 프로젝트일 경우
│── build.gradle  (Gradle 프로젝트 설정 파일)  // Gradle 프로젝트일 경우
```

### 질문

1. 서버 실행하는 포트를 변경하려면?

> application.properties에 아래 내용 추가
>
> ```
> server.port=9090
> ```
