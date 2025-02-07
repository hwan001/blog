+++
title = '1. Introduction-4'
date = 2025-01-20T15:00:18+09:00
draft = false
descriptions = "Get Started"
categories = ["posting", "celery"]
+++

---
# Get Started 

🌟 1. Celery 설치하기

Celery 설치는 간단하며, Python 패키지 관리 도구 pip를 이용합니다.
- Redis를 메시지 브로커로 사용할 경우:
```py
pip install celery[redis]
```
🌟 2. 첫 번째 Celery 애플리케이션 만들기

tasks.py 파일 생성
```py
from celery import Celery

# Celery 앱 초기화
app = Celery('tasks', broker='redis://localhost:6379/0')

# 간단한 덧셈 작업 정의
@app.task
def add(x, y):
    return x + y
```

- **Celery('tasks')**는 Celery 애플리케이션의 이름을 지정합니다.
- 브로커 URL은 Redis를 로컬에 설치한 경우를 기준으로 설정한 예시입니다.

🌟 3. 워커(Worker) 실행하기

Celery 워커를 실행하려면 터미널에서 다음 명령어를 입력합니다:
```sh
celery -A tasks worker --loglevel=info
```
- -A tasks: tasks.py에 정의된 Celery 앱을 사용하겠다는 의미입니다.
- --loglevel=info: 실행 중 발생하는 로그를 출력합니다.

🌟 4. 작업 호출하기

Celery는 작업을 비동기적으로 실행할 수 있습니다. 아래와 같이 Python 콘솔에서 호출해보세요:
```
from tasks import add

# 작업 호출 (비동기)
result = add.delay(4, 6)

# 결과 가져오기 (동기적)
print(result.get())  # 출력: 10
```

- add.delay(4, 6): 덧셈 작업을 비동기적으로 실행합니다.
- result.get(): 작업 결과를 동기적으로 가져옵니다.

🌟 5. 예제의 전체 실행 과정
	1.	tasks.py에 작업을 정의합니다.
	2.	Celery 워커를 실행합니다.
	3.	Python 콘솔에서 작업을 비동기적으로 호출합니다.
	4.	워커가 작업을 처리하고 결과를 반환합니다.

🚀 결론

Celery는 간단한 설치와 기본 설정만으로도 비동기 작업을 손쉽게 처리할 수 있습니다. 이 기본 예제를 기반으로 이메일 발송, 데이터 변환 등 다양한 백엔드 작업을 확장할 수 있습니다.

다음 단계: Celery의 고급 기능인 주기적 작업(Scheduled Tasks), 결과 백엔드 설정 등을 설정하여 더 복잡한 환경을 구성할 수 있습니다.