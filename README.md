# <center> **Multiplayer_Pacman** <center/>
> `동아리 홍보를 위한 멀티플레이어 팩맨 게임`

## 23-01-31
> `프로젝트 생성`
 - 기본적인 프로젝트 생성
 - 원활한 게임 개발을 진행하기 위한 모듈용 engine.js 생성
> `게임오브젝트`
 - 렌더링 또는 포지셔닝 등을 원활히 하기 위해 생성한 클래스
> `카메라`
 - 단순히 캔버스에 그리기만 하는 게임이 아닌 메모리 상 오브젝트들을 상황에 맞춰 렌더링해야 하는 경우가 존재해 카메라 클래스 생성
 - 모든 오브젝트를 관리하는 objectList에서 오브젝트들의 포지션을 계산하여 카메라 범위 안에 존재하면 렌더링 할 renderableObjects에 삽입
 - 카메라 내부 오브젝트 선별을 위한 계산식
   - 좌측 범위 내부 : object.position.x + object.size.x > camera.position.x;
   - 우측 범위 내부 : object.position.x < camera.position.x + camera.size.x;
   - 상단 범위 내부 : object.position.y + object.size.y > camera.position.y;
   - 하단 범위 내부 : object.position.y < camera.position.y + camera.size.y;
 - renderableObjects에서 오브젝트들이 카메라 내부에 속한 위치에(오브젝트의 포지션 - 카메라의 포지션) 오브젝트 스프라이트 렌더링

<image src="ETC/camera.gif"><image/>

<br/>

## 23-02-01
> `플레이어 오브젝트`
 - 각도
   - 방향에 따라 스프라이트의 각도를 돌리기 위해 degreeAngle속성 추가
   - changeDirection(targetDirection) 함수에서 targetDirection에 따라 각도 부여
   - (0, -1) : up, 0도
   - (0, 1) : down, 180도
   - (-1, 0) : left. 270도
   - (1, 0) : right, 90도
> `각도에 따른 렌더링`
 - context를 선점하여 이의 각도를 돌린 후 그린 뒤 원래 상태로 돌려두는 방식
 - context를 원래 상태로 돌려두는 데에서 막힘 (context의 각도가 원래 상태로 돌아가지 않음)