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

<h4>Camera</h4>
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
> `스프라이트 제작`
 - 장애물 스프라이트 제작
   - obstacle_leftTop.png
   - obstacle_left.png
   - obstacle_leftBottom.png
   - obstacle_top.png
   - obstacle_bottom.png
   - obstacle_rightTop.png
   - obstacle_right.png
   - obstacle_rightBottom.png
 - 배경 스프라이트 제작
   - base.png

<h4>Input</h4>
<image src="ETC/input.gif"></image>
<h4>CameraFollowing</h4>
<image src="ETC/cameraFollowing.gif"></image>

<br/>

## 23-02-03
> `맵 렌더링 수정`
 - 기존 x y 이중 포문을 사용해 맵 데이터를 읽었을 때
 - \[ x \] \[ y \]에 \[ 열 \] \[ 행 \]으로 대입되는 문제 발생
 - \[ y \] \[ x \]방식으로 \[ 행 \] \[ 열 \]을 대입하여 문제 해결
> `Player`
 - 플레이어 스크립트들을 쉽게 접근하기 위해 플레이어 스크립트를 모아둠
> `Collider`
 - 타일 게임오브젝트 및 코인 게임 오브젝트에 스크립트 부여
 - 해당 오브젝트와 겹치거나 닿으면 타겟 오브젝트의 onCollision 발동 (매개변수로 해당 오브젝트의 이름을 보냄)
 - 플레이어는 해당 오브젝트와 부딪혔을 때 잠깐의 경직과 방향 반전이 일어난다
> `PlayerWallet`
 - 플레이어의 코인을 관리하는 스크립트
 - 벽에 닿을 때 코인이 절반으로 떨어지고 코인이 0이 되면 사망
> `CoinTile`
 - 코인을 생성하는 타일
 - Collider를 변수로 갖고 있으며 코인이 플레이어에 의해 사라진 후 5초 뒤 Collider의 액티브를 켜주며 오브젝트의 스프라이트를 코인으로 바꾼다

<image src="ETC/obstacle&wallet.gif"></image>
<image src="ETC/coin.gif"></image>

<br/>

## 23-02-05
> `서버 구조 생성`
 - 클라이언트에서 바이트 배열로 되어있는 데이터를 받음
 - 데이터를 형식에 맞게 자른 후 패킷 큐에 쌓아둠
   - length = arr[0]
   - type = arr[1]
   - event = arr[2]
   - data = arr[3, length];

<br/>

## 23-02-09
> `서버 구조`
 - 1/20 초씩 패킷 큐에 쌓여있는 데이터를 하나씩 내보냄
 - 내보낸 데이터는 패킷 감시자에 의해 감시자를 구독하고 있는 패킷에 보내짐
 - 패킷에 타입과 이벤트에 맞는 핸들러에 데이터가 보내짐
 - 데이터를 받은 핸들러는 데이터를 처리함
> `문제`
 - 어떤 방식으로 핸들러를 패킷 옵저버에 구독시켜야 잘했다고 소문이 날까?

<br/>

## 23-02-10
> `패킷 직렬화 수정`
 - 기존 방식
   - 배열의 크기를 정해두고 앞자리를 타입과 이벤트로 채움
   - 그 후에 데이터의 바이트 배열을 위 배열과 concat
 - 문제점
   - concat을 하고 값을 안 담음!!
> `데이터 파싱 완료`

<image src="ETC/dataParsing.gif"></image>

> `핸들러 구조 짜기`
 - handlers \[ 타입 \] \[ 이벤트 \] = handler();
> `네트워크 매니저`
 - 서버와 비슷한 구조이지만 서버에 전송하기 전 패킷들을 직렬화 해 일정 주기마다 보내는 함수가 존재함
 - sendStream
   - 각 서버에 값을 전송해야 할 컴포넌트들은 sendStream에 값 전송을 요청하는 콜백을 구독을 해둔다
   - sendStream은 서버에 전송하기 전 구독 된 콜백들을 실행시켜 전송할 값들을 모은다
   - 바이트 배열로 모여진 전송할 값들은 서버에 보내진다
 - 클라이언트 내부의 싱글톤 맴버들을 거의 다 갖고있음
> `접속하기`
 - 클라이언트가 서버와 연결될 때 type:login, event:join을 보낸다
 - 서버에선 플레이어 리스트에 추가하고 들어온 패킷을 돌려보낸다
 - 다른 클라들에겐 누군가 들어왔다고 알리는 패킷을 전송한다
 - 클라에선 패킷이 돌아왔을 때 팩맨 게임을 로드하고
 - 다른 클라들에선 플레이어를 리스트에 추가한다

<br/>

## 23-02-12
> `ws 모듈 임포트가 안됨`
> `문제점`
 - ws모듈을 웹 브라우저에서 돌리기 위해선 webpacking을 해야됨
   - 패킹도중 모듈을 찾을 수 없어 문제가 생김
   - 클라이언트 쪽 소켓을 ws의 웹소켓이 아닌 내장되어있는 WebSocket으로 변경해 해결함
 - 프론트엔드 서버와 백엔드 서버가 같아야 함
   - 익스프레스 서버를 열어 ws서버에 물려서 해결함