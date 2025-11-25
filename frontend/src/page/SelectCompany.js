import { useEffect, useMemo, useState } from "react";
import "../css/selectcompany.css";
import { Building2, MapPin, User, Phone, Mail, BadgeDollarSign } from "lucide-react";


export default function SelectCompany() {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 총 페이지
  const totalPages = Math.max(1, Math.ceil(companyData.length / perPage));

  // 현재 페이지가 범위 밖으로 나가지 않도록 보정
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const startIndex = (page - 1) * perPage;

  // 페이지별 데이터 (메모)
  const currentList = useMemo(() => {
    return companyData.slice(startIndex, startIndex + perPage);
  }, [companyData, startIndex, perPage]);


  return (
    <div className="pc-page">
      <header className="pc-header">
        <div className="pc-header-inner">
          <div className="pc-header-left">
            <div className="pc-logo">
              <Building2 className="pc-icon" />
            </div>
            <div>
              <h1 className="pc-title">원도급사 업체 조회</h1>
            </div>
          </div>
          <div className="pc-header-right">
            <button
              className="pc-btn-link"
              onClick={() => window.location.href = "/subcompany"} // 원도급사 페이지 경로에 맞게 수정
            >
              <Building2 className="pc-btn-icon" />
              하수급사 업체 조회
            </button>
          </div>
        </div>
      </header>

      <main className="pc-container">
        {/* ✅ 페이지 키를 그리드에 부여해서 강제 재조합 */}
        <div className="pc-grid" key={`grid-page-${page}`}>
          {(loading ? Array.from({ length: 9 }) : currentList).map((data, idx) => (
            <div key={`card-${page}-${data?.id ?? idx}`} className="pc-card pc-fadeup">
              <div className="pc-card-top">
                <div className="pc-card-title-wrap">
                  <div className="pc-card-title-row">
                    <h3 className="pc-card-title">
                      {loading ? "업체명 표시" : data.companyName ?? "—"}
                    </h3>
                  </div>
                  <p className="pc-meta-small">
                    사업자등록번호 {loading ? "—" : data.businessRegNo ?? "—"}
                  </p>
                </div>
              </div>

              <div className="pc-card-meta">
                <div className="pc-meta-item">
                  <MapPin className="pc-icon-xs" />
                  아이디 {loading ? "—" : data.id ?? "—"}
                </div>

                <div className="pc-meta-item">
                  <User className="pc-icon-xs" />
                  담당자 이름 {loading ? "—" : data.contactPerson ?? "—"}
                </div>

                <div className="pc-meta-item pc-col-2">
                  <Phone className="pc-icon-xs" />
                  담당자 연락처 {loading ? "—" : data.contactPhoneNumber ?? "—"}
                </div>

                <div className="pc-meta-item pc-col-2">
                  <Mail className="pc-icon-xs" />
                  담당자 이메일 {loading ? "—" : data.contactEmail ?? "—"}
                </div>

                <div className="pc-meta-item pc-col-2">
                  <BadgeDollarSign className="pc-icon-xs" />
                  요금제 {loading ? "—" : (data.priceName ?? data.price?.priceName ?? "—")}
                </div>
              </div>
            </div>
          ))}
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
