import React from 'react';

function HomePage({ isLoggedIn }) {
    return (
      <div>
        {isLoggedIn ? (
          <>
            <button>나의 페이지</button>
            <button>로그아웃</button>
          </>
        ) : (
          <>
            <button>로그인</button>
            <button>회원가입</button>
          </>
        )}
        {/* 상품 정보를 여기에 렌더링 */}
      </div>
    );
  }
  
  export default HomePage;