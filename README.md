# <center> **Multiplayer_Pacman** <center/>
> `동아리 홍보를 위한 멀티플레이어 팩맨 게임`

## 23-01-31
> `프로젝트 생성`
 - 기본적인 프로젝트 생성
 - 원활한 게임 개발을 진행하기 위한 모듈용 engine.js 생성
> `게임오브젝트`
 - 렌더링 또는 포지셔닝 등을 원활히 하기 위해 생성한 클래스
> `카메라`
 - 단순히 캔버스에 그리기만 하는 게임이 아닌 메모리 상 오브젝트들을 상황에 맞춰 렌더링해야 하는 경우가 존재하는 게임을 개발해야  카메라 클래스 생성
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

<br/>

## 23-02-02
> `각도에 따른 렌더링`
 - 어제와는 다른 방식으로 접근
 - context를 초기화 후 context의 포지션을 렌더링할 오브젝트의 포지션으로 설정과 동시에 오브젝트의 라디안 각도로 설정 (radian = degree * pie / 180)
 - 그 상태에서 오브젝트 렌더링 후 context의 세팅을 롤백
 - 위와 같은 방법으로 각도에 따른 렌더링 성공
> `Input`
 - 플레이어의 입력을 읽기 쉽도록 하기 위해 생성한 클래스
 - 오브젝트 형태의 keysDown, keysUp 이 존재 
   - 키가 눌렸을 때 keysDown\[ key \] = true
   - 키가 떼졌을 때 delete keysDown\[ key \] / keysUp\[ key \] = true
   - 한 프레임 후 delete keysUp\[ key \]
> `Map`
 - 플레이어가 이동할 수 있는 맵을 생성하기 위한 클래스
 - 숫자로 이루어진 문자열 MapData에서 TileType에 알맞게 파싱하여 게임오브젝트를 생성한 뒤 2차원 배열 tileList에 넣는다
 - main.js 스크립트에서의 objectList와 별개로 카메라에 넘겨주어 배경을 렌더링한다
> `FollowingCamera`
 - 플레이어가 카메라의 중앙에 올 수 있도록 카메라의 포지션을 플레이어의 위치에 배치한다

<image src="ETC/input.gif"><image/>

<br/>
