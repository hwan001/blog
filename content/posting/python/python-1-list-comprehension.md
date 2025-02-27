+++
title = 'List Comprehension'
date = 2025-01-22T15:40:02+09:00
draft = false
categories = ["posting", "python"]
descriptions = "Python 리스트 컴프리핸션"
+++

---
### 리스트 컴프리헨션 (List Comprehension)

1. 기능 설명
    - 리스트 컴프리헨션은 파이썬에서 간결하고 직관적인 방법으로 새로운 리스트를 생성하는 표현식입니다.
    - for 반복문과 조건문을 한 줄로 작성할 수 있어 코드가 간단해지고 가독성이 좋아집니다.

2. 기본 문법
    ```py
    [표현식 for 요소 in 반복 가능한 객체 if 조건]
    ```
    - 표현식: 새로운 리스트에 추가될 값이나 변환된 값
    - for 요소 in 반복 가능한 객체: 반복할 데이터
    - if 조건 (선택적): 조건을 만족하는 경우에만 리스트에 추가

3. 용도
    - 간단한 반복문과 조건문을 사용해 리스트를 빠르게 생성할 때 사용합니다.
    - 데이터 변환이나 필터링 작업에 자주 쓰입니다.

4. 사용 예시
    - 각 요소를 제곱한 리스트 생성
        ```py
        numbers = [1, 2, 3, 4, 5]
        squared_numbers = [x**2 for x in numbers]
        print(squared_numbers)  # 출력: [1, 4, 9, 16, 25]
        ```
        - 설명: numbers의 각 요소를 제곱한 값을 새로운 리스트에 저장합니다.
    - 조건에 따라 필터링된 리스트 생성
        ```py
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        even_numbers = [x for x in numbers if x % 2 == 0]
        print(even_numbers)  # 출력: [2, 4, 6, 8, 10]
        ```
        - 설명: 짝수만 필터링하여 리스트에 추가합니다.