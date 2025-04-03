import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Header from "../component/Header";
import SearchBook from "./SearchBook";
import BookList from "./BookList";
import { searchBookApi, BookType, BookMetaDataType } from "../api";
import Pagenation from "../component/Pagenations";

const useSearchBook = (query: string, page: number) => {
  return useQuery({
    queryKey: ["searchBook", query, page],
    queryFn: async () => {
      const oData = {
        query,
        sort: "accuracy",
        page: page,
        size: 10,
      };
      return searchBookApi(oData);
    },
    enabled: !!query,
  });
};

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likeBook, setLikeBook] = useState<BookType[]>(() => {
    const savedBooks = localStorage.getItem("likeBook");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  const { data } = useSearchBook(searchQuery, currentPage);
  const bookData = data?.data?.documents ?? [];
  const bookMetaData: BookMetaDataType = data?.data.meta;
  console.log("likeBook>>>", likeBook);

  return (
    <Style>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="contentWrap">
        <div>
          {activeTab === 0 && (
            <SearchBook
              searchQuery={searchQuery}
              setCurrentPage={setCurrentPage}
              setSearchQuery={setSearchQuery}
            />
          )}
        </div>
        <BookList
          type={activeTab === 0 ? "search" : "liked"}
          likeBook={likeBook}
          setLikeBook={setLikeBook}
          bookData={activeTab === 0 ? bookData : likeBook}
          bookMetaData={bookMetaData}
        />
        {bookMetaData?.total_count > 10 && (
          <Pagenation
            bookMetaData={bookMetaData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </Style>
  );
};

export default MainPage;

const Style = styled.div`
  .contentWrap {
    width: 1000px;
    margin: 0 auto;
    padding: 80px 0;
  }
  @media (max-width: 1000px) {
    .contentWrap {
      width: 100%;
      padding: 0 3vw;
    }
  }
`;
