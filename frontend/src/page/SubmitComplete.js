// src/page/SubmitComplete.js
import React from "react";
import "../css/submit-complete.css";

export default function SubmitComplete() {
  const handleBack = () => {
    // 이전 페이지로 이동 (필요에 따라 수정)
    window.history.back();
    // 또는 메인으로 보내고 싶으면:
    // window.location.href = "/";
  };

  return (
    <main className="submit-complete-page">
      <div className="submit-card" role="status" aria-live="polite">
        <div className="icon-wrapper" aria-hidden="true">
          <div className="icon-circle">
            <svg
              className="icon-check"
              viewBox="0 0 24 24"
              width="32"
              height="32"
            >
              <path
                d="M5 13l4 4L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="submit-title">제출이 완료되었습니다.</h1>
        <p className="submit-message">
          입력하신 업체 정보가 정상적으로 등록되었습니다.
          <br />
          관리자 확인 후 추가 안내를 드릴 예정입니다.
        </p>
      </div>
    </main>
  );
}
