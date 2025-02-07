+++
title = '1. Introduction-9'
date = 2025-01-20T15:00:18+09:00
draft = false
descriptions = "Installation"
categories = ["posting", "celery"]
+++

---
# Installation 

🌟 Celery 설치 방법

Celery는 Python의 **패키지 관리 도구(PIP)**를 이용해 간단하게 설치할 수 있습니다.
```sh
pip install celery
```
🌟 브로커에 따른 추가 설치

Celery는 메시지 브로커가 필요합니다. 가장 많이 사용되는 Redis 또는 RabbitMQ를 선택하여 설치할 수 있습니다.
1.	Redis를 사용할 경우:
```sh
pip install celery[redis]
```

2.	RabbitMQ를 사용할 경우:
```sh
pip install celery[rabbitmq]
```
🌟 추가 설치 옵션
- Amazon SQS, MongoDB 등 다른 브로커를 사용할 경우 해당 브로커에 맞는 의존성을 설치할 수 있습니다.

예제:
```sh
pip install celery[sqs]       # Amazon SQS
pip install celery[mongodb]   # MongoDB
```
🌟 Celery 기본 애플리케이션 예제
1.	tasks.py 파일 생성:
```py
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task
def add(x, y):
    return x + y
```

2.	워커 실행:
```sh
celery -A tasks worker --loglevel=info
```

3.	작업 호출:
```py
from tasks import add
result = add.delay(4, 6)
print(result.get())  # 결과: 10
```

🚀 요약
- Celery 설치는 pip 명령어로 간단히 수행할 수 있으며, 사용하는 메시지 브로커에 따라 추가 의존성을 설치해야 합니다.
- Redis 또는 RabbitMQ가 가장 흔히 사용되며, 대규모 프로젝트에서도 안정적인 메시지 브로커로 작동합니다.
- 설치 후 기본적인 작업 처리 구조를 손쉽게 설정할 수 있습니다.