// src/page/SelectCompany.jsx (예시 경로)
import { useEffect, useMemo, useState } from "react";
import "../css/selectcompany.css";
import axios from "axios";
import {
  Building2,
  MapPin,
  User,
  Phone,
  Mail,
  BadgeDollarSign,
  Target,
  FileText,
  CalendarDays,
} from "lucide-react";

export default function SelectCompany() {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔗 백엔드 기본 URL (.env에 설정)
  const API = process.env.REACT_APP_API_BASE_URL;

  // ✅ 최초 1번 회사 리스트 호출
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${API}/selectCompanyList`);
        setCompanyData(res.data || []);
      } catch (err) {
        console.error("업체 리스트 조회 중 오류:", err);
        alert("업체 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [API]);

  // 총 페이지 계산
  const totalPages = Math.max(1, Math.ceil(companyData.length / perPage));

  // 현재 페이지가 범위 밖으로 나가지 않도록 보정
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const startIndex = (page - 1) * perPage;

  // 페이지별 데이터
  const currentList = useMemo(() => {
    return companyData.slice(startIndex, startIndex + perPage);
  }, [companyData, startIndex, perPage]);

  // 날짜 포맷 유틸 (YYYY-MM-DD만 보여주기)
  const formatDate = (value) => {
    if (!value) return "—";
    // createdAt 또는 created_at 둘 다 대응
    const str = String(value);
    return str.length >= 10 ? str.slice(0, 10) : str;
  };

  return (
    <div className="pc-page">
      <header className="pc-header">
        <div className="pc-header-inner">
          <div className="pc-header-left">
            <div className="pc-logo">
              <Building2 className="pc-icon" />
            </div>
            <div>
              <h1 className="pc-title">업체 정보 조회</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="pc-container">
        {/* ✅ 페이지 키를 그리드에 부여해서 강제 재조합 */}
        <div className="pc-grid" key={`grid-page-${page}`}>
          {(loading ? Array.from({ length: 9 }) : currentList).map((data, idx) => {
            const item = loading ? {} : data;

            const loginId = loading ? "—" : item.loginId ?? "—";
            const businessRegNo = loading ? "—" : item.businessRegNo ?? "—";
            const companyName = loading ? "업체명 표시" : item.companyName ?? "—";
            const contactPerson = loading ? "—" : item.contactPerson ?? "—";
            const contactPhoneNumber = loading ? "—" : item.contactPhoneNumber ?? "—";
            const contactEmail = loading ? "—" : item.contactEmail ?? "—";
            const address =
              loading ? "—" : [item.address, item.addressDetail].filter(Boolean).join(" ");
            const targetNoAccidentDays =
              loading ? "—" : item.targetNoAccidentDays ?? "—";
            const targetIncident = loading ? "—" : item.targetIncident ?? "—";
            const targetLaw = loading ? "—" : item.targetLaw ?? "—";
            const targetEtc = loading ? "—" : item.targetEtc ?? "—";
            const mainProcess = loading ? "—" : item.mainProcess ?? "—";
            const hasRequiredDocs = loading ? "—" : item.hasRequiredDocs ?? "—";
            const createdAt =
              loading ? "—" : formatDate(item.createdAt ?? item.created_at);
            const updatedAt =
              loading ? "—" : formatDate(item.updatedAt ?? item.updated_at);

            return (
              <div
                key={`card-${page}-${item.loginId ?? idx}`}
                className="pc-card pc-fadeup"
              >
                {/* 상단: 업체 기본 정보 */}
                <div className="pc-card-top">
                  <div className="pc-card-title-wrap">
                    <div className="pc-card-title-row">
                      <h3 className="pc-card-title">{companyName}</h3>
                    </div>
                    <p className="pc-meta-small">
                      사업자등록번호&nbsp;{businessRegNo}
                    </p>
                  </div>
                </div>

                {/* 중간: 기본 메타 정보 */}
                <div className="pc-card-meta">
                  <div className="pc-meta-item">
                    <User className="pc-icon-xs" />
                    로그인 아이디&nbsp;{loginId}
                  </div>

                  <div className="pc-meta-item">
                    <User className="pc-icon-xs" />
                    담당자 이름&nbsp;{contactPerson}
                  </div>

                  <div className="pc-meta-item pc-col-2">
                    <Phone className="pc-icon-xs" />
                    담당자 연락처&nbsp;{contactPhoneNumber}
                  </div>

                  <div className="pc-meta-item pc-col-2">
                    <Mail className="pc-icon-xs" />
                    담당자 이메일&nbsp;{contactEmail}
                  </div>
                </div>

                {/* 주소 영역 */}
                <div className="pc-card-section">
                  <div className="pc-section-title">
                    <MapPin className="pc-icon-xs" />
                    <span>주소</span>
                  </div>
                  <p className="pc-section-text">{address || "—"}</p>
                </div>

                {/* 대시보드 목표 수치 */}
                <div className="pc-card-section">
                  <div className="pc-section-title">
                    <Target className="pc-icon-xs" />
                    <span>대시보드 목표 수치</span>
                  </div>
                  <div className="pc-target-grid">
                    <div className="pc-target-item">
                      <span className="pc-target-label">무재해 일수</span>
                      <span className="pc-target-value">
                        {targetNoAccidentDays} 일
                      </span>
                    </div>
                    <div className="pc-target-item">
                      <span className="pc-target-label">사건/사고</span>
                      <span className="pc-target-value">
                        {targetIncident} 건
                      </span>
                    </div>
                    <div className="pc-target-item">
                      <span className="pc-target-label">법률/규정</span>
                      <span className="pc-target-value">
                        {targetLaw} 건
                      </span>
                    </div>
                    <div className="pc-target-item">
                      <span className="pc-target-label">기타</span>
                      <span className="pc-target-value">
                        {targetEtc} 건
                      </span>
                    </div>
                  </div>
                </div>

                {/* 주요 공정 */}
                <div className="pc-card-section">
                  <div className="pc-section-title">
                    <FileText className="pc-icon-xs" />
                    <span>주요 공정</span>
                  </div>
                  <p className="pc-section-text">
                    {mainProcess && mainProcess !== "—"
                      ? mainProcess
                      : "등록된 주요 공정이 없습니다."}
                  </p>
                </div>

                {/* 필수 제출 서류 여부 / 등록일자 */}
                <div className="pc-card-section pc-card-footer">
                  <div className="pc-footer-left">
                    <span className="pc-footer-label">필수 제출 서류 사용 여부</span>
                    <span className="pc-footer-value">{hasRequiredDocs}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ 페이지네이션 */}
        <div className="pc-pagination">
          <button
            className="pc-page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            이전
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`pc-page-btn ${page === idx + 1 ? "is-active" : ""}`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="pc-page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            다음
          </button>
        </div>
      </main>
    </div>
  );
}
