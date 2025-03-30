import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Title1, Title2 } from '../style/Text';
import Header from '../component/Header';
import SearchBook from "./SearchBook";
import { tabHeaderData } from "../component/tabComponent/TabHeaderData";

const MainPage: React.FC = () => {
    // const [loading, setLoading] = useState<boolean>(true);

    const [activeTab, setActiveTab] = useState<number>(0);

    // const [error, setError] = useState<string | null>(null);
    // const getData = async () => {
    //     try {
    //       const result = await webData();
    //       setData(result);
    //     } catch (err) {
    //       setError('데이터를 가져오는 데 실패했습니다.');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    useEffect(() => {


        //   getData();
    }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <Style>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='contentWrap'>
                <div>{tabHeaderData[activeTab].content}</div>
            </div>

        </Style>
    );
};

export default MainPage;

const Style = styled.div`
.contentWrap {
    width: 100%;
    margin: 0 auto;
    padding: 80px 30%;
}
  
`;