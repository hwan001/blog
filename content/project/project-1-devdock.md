+++
title = 'DevDock'
date = 2025-01-18T16:16:35+09:00
draft = false
categories = ["project", "devdock"]
+++

### 용도
Docker와 vscode 그리고 해당 Extension이 설치된 상태에서 단축키로 도커 명령어를 실행해 여러 언어의 코드들을 빌드할 수 있음. 
(os 구분없이 docker 명령어 실행에 문제없는 상태)

지원하는 확장자의 파일을 생성하고 해당 파일에 포커스를 둔 상태로 단축키를 누르면, 도커파일이 없을 경우 기본 템플릿 형태로 생성함. (ex. cpp.Dockerfile)

도커파일과 소스코드 파일이 있을 경우 도커파일을 빌드하고 해당 이미지로 컨테이너를 생성하여 코드를 실행하고 결과를 출력함.

<img src="/blog/images/project/devdock/devdock-1-cpp.png">

지원하는 언어 목록과 템플릿은 **cmd(ctrl) + shift + alt + o** 단축키로 config 파일을 열어서 수정이 가능함.

웹 서버처럼 포트를 외부로 열어줘야하는 경우, 도커파일에 EXPOSE 구문을 추가하면 랜덤한 포트로 열어줌

**예시**
```dockerfile
FROM golang:1.21

WORKDIR /app
COPY go-test /app

RUN go mod init main
RUN go mod tidy
RUN go build -o main .

EXPOSE 8080 8081

CMD ["./main"]
```

### 단축키
| Shortcut | Commnad | Function |
|:---:|:---:|:---:|
| cmd(ctrl) + shift + alt + r | devdock.run | build and run |
| cmd(ctrl) + shift + alt + t | devdock.clean | clean all images and containers |
| cmd(ctrl) + shift + alt + o | devdock.openConfig | Open your config file. |
| cmd(ctrl) + shift + alt + c | devdock.check | Check local environment |
