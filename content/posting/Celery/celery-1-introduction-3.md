+++
title = '1. Introduction-3'
date = 2025-01-20T15:00:18+09:00
draft = false
descriptions = "What do I need?"
categories = ["posting", "celery"]
+++

---

# What do I need?

🌟 Celery를 시작하기 위해 필요한 필수 요소

1. 메시지 브로커 (Message Broker)

- Celery는 비동기 작업을 관리하기 위해 브로커가 필요합니다.
- 브로커는 작업 메시지를 전달하고 **프로듀서(Producer)**와 워커(Worker) 간의 연결을 담당합니다.
- 지원되는 브로커:
- Redis (가장 간단하고 많이 사용됨)
- RabbitMQ (대규모 분산 환경에 적합)
- Amazon SQS 등 다양한 브로커 지원

2. 작업 실행 환경 (Worker)

- Celery의 **워커(Worker)**는 브로커에서 메시지를 받아 실제로 작업을 처리하는 역할을 합니다.
- 워커는 Celery의 핵심 구성 요소로, 여러 워커를 병렬로 실행하여 대규모 비동기 작업을 효율적으로 분산 처리할 수 있습니다.

3. 결과 저장소 (Backend, 선택 사항)

- Celery는 작업 결과를 저장하는 백엔드 시스템을 지원합니다.
- 선택 사항으로, 결과가 필요하지 않으면 설정하지 않아도 됩니다.
- 결과 백엔드는 작업 상태 추적 및 결과 반환 시 유용합니다.
- 지원되는 백엔드 예시:
- Redis
- Database (MySQL, PostgreSQL)
- Amazon S3
- RPC 백엔드 등

4. 설치가 간단한 Python 라이브러리

- Celery는 Python 프로젝트에서 쉽게 설정하고 사용할 수 있는 라이브러리입니다.
- 설치 방법:

```py
pip install celery[redis]
```

위 명령은 Redis 브로커를 포함한 Celery 설치를 수행합니다.

💡 설정의 기본 구성

- 브로커 URL 설정: Celery는 설정에서 브로커 URL을 사용해 메시지를 주고받습니다.

```
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')
```

🚀 요약

- 필수: 메시지 브로커(Redis, RabbitMQ 등)와 워커 프로세스가 필요함.
- 선택적: 작업 결과가 필요할 경우 백엔드 설정을 추가할 수 있음.
- 설치: 간단한 Python 라이브러리 설치로 빠르게 시작 가능.

👉 결론:
Celery는 필요한 설정과 종속성이 간단해 소규모 프로젝트부터 대규모 분산 처리 시스템까지 폭넓게 적용할 수 있습니다.
