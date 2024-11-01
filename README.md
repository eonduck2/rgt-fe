# 기능 구현
- 사용자가 입력 폼을 통해 FastAPI 서버로 입력 데이터를 전송합니다.
- FastAPI 서버에서 해당 본문을 임시 저장소에 성공적으로 캐싱하면 "주문이 접수되었습니다" 메시지를 반환받습니다.
- 해당 반환 메시지를 사용자에게 모달창으로 띄워줍니다.
- 사용자는 추가적인 주문 및 대시보드 탭을 이용해 대시보드 페이지로 이동할 수 있습니다.
- 대시보드 페이지에 접속하게 되면 FastAPI 서버에 웹 소켓 요청을 보내게되고, 요청이 성공하면 웹 소켓에 연결됩니다.
- 웹 소켓을 통해 연결된 대시보드 페이지에 사용자의 추가적인 주문이 들어오면
  임시 저장소에 캐싱된 데이터를 이용하고있는 웹 소켓이 대시보드로 해당 메시지를 브로드캐스팅, 대시보드의 주문 현황을 실시간으로 업데이트합니다.
- 테이블 형식의 주문 목록에서 사용자가 상태 변경 버튼을 눌러 각 주문의 상태를 업데이트할 수 있으며
  해당 업데이트는 FastAPI 서버에 PUT 메서드로 주문 번호와 함께 요청돼, 캐싱된 데이터의 값을 변경하고 상태를 업데이트합니다.
- 사용자는 대시보드에서 주문 업데이트, 정렬, 검색과 같은 부가적인 기능을 이용할 수 있습니다.

# 사용자 UI 설계
### 메인 페이지
![주문 페이지](https://github.com/user-attachments/assets/600038e2-5b4e-416a-a1ce-202307d0497f)

### 대시보드 페이지
![대시보드](https://github.com/user-attachments/assets/f366e17a-6af5-44fa-885f-dee8ac714c11)

### 404 페이지
![404](https://github.com/user-attachments/assets/659d88e1-7d3a-462d-a15d-963fb4bb0b80)

# 최적화
- 사용자가 입력한 음식 이름, 수량, 객체 형식의 음식과 수량 각각 3가지의 값을 메모이제이션하고
  동일한 이전 주문에 대해서 보다 빠른 접수가 이뤄집니다.
