import React from 'react'

import HomePageLayout from '../HOCs/HomePageLayout';

const Home:React.FC = () => {
    return (
        
        <div style={{
            paddingTop:"100px"
        }}>
            Home
        </div>
    )
};

export default HomePageLayout(Home);