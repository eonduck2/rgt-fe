/**
 * @eonduck2 24.10.31
 * @description 모ㅌ달 내부 클릭 시 이벤트 전파(버블링) 방지
 * @param { React.MouseEvent } e 마우스(클릭) 이벤트 객체
 */
export default (e: React.MouseEvent) => {
  e.stopPropagation();
};

