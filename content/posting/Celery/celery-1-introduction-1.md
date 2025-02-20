+++
title = '1. Introduction-1'
date = 2025-01-20T15:00:18+09:00
draft = false
descriptions = ""
categories = ["posting", "celery"]
+++

---

# Introduction

Celery는 비동기 작업 큐로서, 주로 백그라운드 작업 처리나 비동기 처리를 위해 사용됩니다. Python으로 작성되었으며 분산 메시지 전달을 지원해 확장성이 뛰어난 것이 특징입니다.

### 🌟 Celery의 주요 개념

1. 작업(Task):

- Celery에서 실행되는 단위 작업. 보통 오래 걸리는 연산(예: 이메일 발송, 보고서 생성)을 백그라운드에서 처리함.

2. 브로커(Broker):

- 작업 메시지를 송신하고 관리하는 시스템. Redis, RabbitMQ 같은 메시지 브로커가 주로 사용됨.

3. 워커(Worker):

- 실제로 작업을 처리하는 백그라운드 프로세스. 브로커로부터 메시지를 받아 작업을 실행함.

### 🔑 Celery의 주요 기능

- 비동기 작업 처리: 사용자는 함수 호출만 하면 Celery가 비동기적으로 실행함.
- 예약 작업(Scheduled Task): 정해진 시간에 실행되도록 예약 가능 (예: 매일 밤 데이터 백업).
- 분산 처리: 여러 워커를 병렬로 실행하여 대량의 작업을 빠르게 분산 처리할 수 있음.

### 🛠️ 기본 동작 과정

1. 사용자가 Celery로 작업을 등록함.
2. 등록된 작업은 브로커로 전송됨.
3. 워커가 브로커로부터 작업 메시지를 수신함.
4. 워커가 작업을 처리하고 결과를 반환함.

### 💡 예제 코드

```sh
pip install celery[redis]  # Redis 브로커 설치
```

**tasks.py 파일 생성:**

```py
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task
def add(x, y):
    return x + y
```

**작업 호출:**

```py
>>> from tasks import add
>>> result = add.delay(4, 6)  # 비동기로 작업 실행
>>> result.get()  # 결과 가져오기 (6 + 4 = 10)
```

### 🔧 지원 브로커

- RabbitMQ
- Redis (가장 많이 사용됨)
- Amazon SQS, MongoDB 등도 설정 가능

### 📈 활용 사례

- 이메일 전송
- 비디오 렌더링
- 데이터 처리 및 통계 계산
- 예약된 정기 작업

### 🚀 장점

- 손쉽게 비동기 처리를 적용할 수 있음.
- 확장성이 뛰어나고, 대량의 작업도 분산처리 가능.
- 브로커만 설정하면 다양한 환경에서 사용할 수 있음.

### 🌐 문서 링크

- Celery 공식 문서 - [Getting Started](https://docs.celeryq.dev/en/stable/getting-started/introduction.html)
