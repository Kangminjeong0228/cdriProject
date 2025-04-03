import { useState, useRef } from "react";
import styled from "styled-components";
import { Caption, Title2, Body2 } from "../style/Text";
import useSearchHistory from "../hooks/useSearchHistory";
import Select from "../component/tabComponent/Select";

interface SearchBookType {
  setCurrentPage: (currentPage: number) => void;
  setSearchQuery: (searchQuery: string) => void;
  setDetailTarget: (detailTarget: string) => void;
}

const SearchBook: React.FC<SearchBookType> = ({
  setCurrentPage,
  setSearchQuery,
  setDetailTarget,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { searchHistory, addHistory, removeHistory } = useSearchHistory();
  const [searchType, setSearchType] = useState<string>("title");
  const [detailSearchModal, setDetailSearchModal] = useState<boolean>(false);

  const handleSearch = () => {
    const query = detailSearchModal ? searchInput : inputValue;
    if (!query.trim()) return;

    setSearchQuery(query);
    setCurrentPage(1);
    setDetailTarget(detailSearchModal ? searchType : "");
    addHistory(inputValue);
    setInputValue("");
    setSearchInput("");
    setDetailSearchModal(false);
    inputRef.current?.blur();
  };
  const historySearch = (history: string) => {
    addHistory(history);
    setSearchQuery(history);
    setCurrentPage(1);
    inputRef.current?.blur();
    setDetailTarget('');
  }


  return (
    <Style>
      <div>
        <Title2 className="searchBookTitle">도서 검색</Title2>
        <div className="searchContent">
          <div className="searchInput">
            <img
              className="searchIcon"
              src="/assets/svg/searchIcon.svg"
              alt="검색 아이콘"
            />
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="검색어를 입력하세요"
            />
            {isFocused && searchHistory.length > 0 && (
              <div
                className="hitoryWrap"
                onMouseDown={(e) => e.preventDefault()}
              >
                {searchHistory.map((history: string, index: number) => (
                  <div
                    className="historyList"
                    key={index}
                    onClick={() => {
                      historySearch(history);
                    }}
                  >
                    <Caption className="historyTitle">{history}</Caption>
                    <button onClick={(e) => (e.stopPropagation(), removeHistory(history))}
                    >
                      <img src="/assets/svg/remove.svg" alt="삭제 아이콘" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="detailSearchBtnWrap">
            <button
              className="detailSearchBtn"
              onClick={() => { setDetailSearchModal(true); setSearchType('title') }}
            >
              <Body2 className="detailSearchBtnText">상세검색</Body2>
            </button>
            {detailSearchModal && (
              <div className="detailSearchModal">
                <img onClick={() => setDetailSearchModal(false)} className="closeModalBtn" src="/assets/svg/close.svg" alt="닫기 아이콘" />
                <div className="detailSelectSearch">
                  <Select
                    options={[
                      { value: "title", label: "제목" },
                      { value: "person", label: "저자명" },
                      { value: "publisher", label: "출판사" },
                    ]}
                    onChange={(option) => setSearchType(option?.value || "title")}
                    defaultValue={{ value: "title", label: "제목" }}
                  />
                  <input
                    type="text"
                    placeholder="검색어 입력"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <button className="detailSelectSearchBtn" onClick={handleSearch}>검색하기</button>

              </div>
            )}
          </div>
        </div>
      </div>
    </Style>
  );
};

export default SearchBook;

const Style = styled.div`
  .searchBookTitle {
    color: #1a1e27;
  }
  .searchContent {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
    position: relative;
    z-index: 2;
  }

  .searchInput {
    flex: 1;
    width: 100%;
    max-width: 480px;
    position: relative;
    padding: 0 51px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.Background.lightGray};

    .searchIcon {
      position: absolute;
      top: 30%;
      left: 5%;
    }
    input {
      width: 100%;
      padding: 18px 0 16px 0;
      background: none;
      border: none;
      outline: none;
    }
    input::placeholder {
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.Color.subtitle};
    }
    .hitoryWrap {
      width: 100%;
      position: absolute;
      top: 60%;
      left: 0;
      padding: 38px 25px 12px 51px;
      background-color: ${({ theme }) => theme.Background.lightGray};
      z-index: -1;
      border-radius: 0 0 24px 24px;

      .historyList {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        cursor: pointer;
        .historyTitle {
          color: ${({ theme }) => theme.Color.subtitle};
        }
        img {
          width: 16px;
        }
      }
    }
  }

  /* 상세모달 */
  .detailSearchBtnWrap {
    position: relative;
    .detailSearchBtn {
      padding: 10px;
      border: 1px solid ${({ theme }) => theme.Color.subtitle};
      border-radius: 8px;
    }
    .detailSearchBtnText {
      color: ${({ theme }) => theme.Color.subtitle};
    }
  }
  .detailSearchModal {
    width: 360px;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, 30%);
    padding:  36px 24px;
    background: #fff;
    box-shadow: 0px 4px 14px 6px #97979726;
    border-radius: 8px;

    .detailSelectSearch {
      display: flex;
      gap : 4px;

      input {
        flex: 1;
        padding: 5px 9px;
        border: none;
        border-radius: none;
        outline: none;
        border-bottom: 1px solid ${({ theme }) => theme.Background.primary};
        font-size: 14px;
        font-weight: 500;
      }
      input::placeholder {
        color: 1px solid #8D94A0;
      }
    }
    .detailSelectSearchBtn {
      width: 100%;
      margin-top: 16px;
      padding: 7px;
      background-color: ${({ theme }) => theme.Background.primary};
      font-size: 14px;
      font-weight: 500;
      line-height:22px;
      color: #fff;
      border-radius: 8px;
    }
    .closeModalBtn {
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: pointer;
    }
  }
`;
