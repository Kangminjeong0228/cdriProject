import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Title1, Title2, Body2 } from '../style/Text';
import { searchBookApi } from '../api';
import BookList from './BookList';

const useSearchBook = (query: string, page: number) => {
    return useQuery({
        queryKey: ['searchBook', query, page],
        queryFn: async () => {
            const oData = {
                query,
                sort: 'accuracy',
                page: page,
                size: 10,
            };
            return searchBookApi(oData);
        },
        enabled: !!query,
    });
};

const SearchBook: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { data, isLoading, error } = useSearchBook(searchQuery, currentPage);
    const bookData = data?.data?.documents ?? [];
    const bookMetaData = data?.data.meta
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSearchQuery(inputValue);
        }
    };

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery]);


    return (
        <Style>
            <div>
                <Title2 className='searchBookTitle'>도서 검색</Title2>
                <div className='searchContent'>
                    <div className='searchInput'>
                        <img src='/assets/svg/searchIcon.svg' alt="검색 아이콘" />
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            type="text"
                            placeholder='검색어를 입력하세요' />
                    </div>
                    <button ><Body2 className='searchBtnText'>상세검색</Body2></button>
                </div>
                {isLoading && <div>로딩 중</div>}
                {error && <div>다시 시도해주세요요</div>}
                <BookList bookData={bookData} bookMetaData={bookMetaData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

        </Style>
    );
};

export default SearchBook;

const Style = styled.div`
.searchBookTitle{
    color: #1A1E27;
}
.searchContent {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top:16px;

    button {
        padding: 10px;
        border: 1px solid ${({ theme }) => theme.Color.subtitle};
        border-radius: 8px;
    }
    .searchBtnText{
        color: ${({ theme }) => theme.Color.subtitle};
    }
}
.searchInput{
    flex:1;
    max-width: 480px;
    position:relative;
    padding: 0 51px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.Background.lightGray};

    img{
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
        font-weight:500;
        color:${({ theme }) => theme.Color.subtitle};
    }
}

`;