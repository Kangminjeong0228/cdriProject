import styled from "styled-components";
import { BookMetaDataType } from "../api";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  currentPage,
  setCurrentPage,
}) => {
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil((totalPage || 1) / itemsPerPage));
  const maxPageButtons = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  if (totalPages < 2) return null;

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  return (
    <Style>
      <div className="paginationWrap row">
        <button onClick={() => changePage(1)} disabled={currentPage === 1}>
          처음
        </button>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          이전
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`${currentPage === page && "active"}`}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          다음
        </button>
        <button
          onClick={() => changePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          끝
        </button>
      </div>
    </Style>
  );
};
export default Pagination;

const Style = styled.div`
  .paginationWrap {
    width: 100%;
    margin: 20px 0;
    justify-content: center;
    align-items: center;
    gap: 2%;

    button {
      font-size: 16px;
      font-weight: 400;
    }
    .active {
      font-weight: 700;
      color: ${({ theme }) => theme.Background.primary};
    }
  }
`;
