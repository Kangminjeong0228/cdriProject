import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Title1, Title2 } from '../style/Text';
import Header from '../component/Header';
import SearchBook from "./SearchBook";
import { tabHeaderData } from "../component/tabComponent/TabHeaderData";

const MainPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

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