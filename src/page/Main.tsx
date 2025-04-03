import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Header from "../component/Header";
import SearchBook from "./SearchBook";
import BookList from "./BookList";
import { searchBookApi, BookType, BookMetaDataType } from "../api";
import Pagenation from "../component/Pagenations";

const useSearchBook = (
  query: string,
  page: number,
  searchType: string,
  isDetailSearch: boolean
) => {
  return useQuery({
    queryKey: ["searchBook", query, page, searchType, isDetailSearch],
    queryFn: async () => {
      const oData = {
        query,
        sort: "accuracy",
        page,
        size: 10,
      };
      const response = await searchBookApi(oData);

      // if (isDetailSearch) {
      //   const filteredDocuments = response.data.documents.filter(
      //     (book: BookType) => {
      //       if (searchType === "title") return book.title.includes(query);
      //       if (searchType === "author")
      //         return book.authors.some((author) => author.includes(query));
      //       if (searchType === "publisher")
      //         return book.publisher.includes(query);
      //       return false;
      //     }
      //   );

      //   return {
      //     ...response,
      //     data: { ...response.data, documents: filteredDocuments },
      //   };
      // }

      return response;
    },
    enabled: !!query,
  });
};

const MainPage: React.FC = () => {
  const itemsPerPage = 10;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("title");
  const [isDetailSearch, setIsDetailSearch] = useState<boolean>(false);
  const [likeBook, setLikeBook] = useState<BookType[]>(() => {
    const savedBooks = localStorage.getItem("likeBook");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  const { data } = useSearchBook(
    searchQuery,
    currentPage,
    searchType,
    isDetailSearch
  );
  console.log("8888888data", data);
  const sortedLikeBook = [...likeBook].reverse();
  const paginatedLikeBook = sortedLikeBook.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const bookData =
    activeTab === 0 ? data?.data?.documents ?? [] : paginatedLikeBook;
  const bookMetaData: BookMetaDataType | null = data?.data?.meta ?? null;
  const totalBookCount =
    activeTab === 0 ? bookMetaData?.total_count ?? 0 : likeBook.length;

  const handleDetailSearch = (query: string, type: string) => {
    setSearchQuery(query);
    setSearchType(type);
    setCurrentPage(1);
    setIsDetailSearch(true);
  };
  console.log("bookData--->", bookData);
  return (
    <Style>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="contentWrap">
        <div>
          {activeTab === 0 && (
            <SearchBook
              setCurrentPage={setCurrentPage}
              setSearchQuery={setSearchQuery}
              handleDetailSearch={handleDetailSearch}
            />
          )}
        </div>
        <BookList
          type={activeTab === 0 ? "search" : "liked"}
          likeBook={likeBook}
          setLikeBook={setLikeBook}
          bookData={bookData}
          totalBookCount={totalBookCount}
        />

        <Pagenation
          totalPage={totalBookCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
