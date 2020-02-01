import React, { useCallback } from "react";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import PropTypes from "prop-types";
import { Layout, Menu, Button } from "antd";
import styled from "styled-components";
import { withRouter } from 'next/router';

const { Header, Footer } = Layout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction : column;
  width : 100%;
  height: 100vh;
`;
const LayoutHeader = styled(Header)`
  background: white;
  display: flex;
  justify-content : space-between;
  overflow : hidden;
`;

const LayoutFooter = styled(Footer)`
  display: flex;
  margin-top : auto;
  justify-content: center;
  align-items: center;
  font-weight : bold;
  font-size :1em;
`;
const AppLayout = ({ children, router }) => {
  const {pathname} = router;
  const {name} = useSelector(state => state.user);
  const resetOnClick = useCallback(() => {
    localStorage.clear();
  },[]);
  return (
    <LayoutWrapper>
      <LayoutHeader>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="/"><Link href="/"><a><img src="/images/favicon.ico" style={{marginTop: "-5px"}}/><b>HYM</b></a></Link></Menu.Item>
          <Menu.Item key="/howtouse"><Link href="howtouse"><a>사용법</a></Link></Menu.Item>
          {name && <Menu.Item key="/searchimage"><Link href="searchimage"><a>운동사진검색</a></Link></Menu.Item>}
        </Menu>
        <div>
        {name && <span>{`${name}님 환영합니다.  `}</span>}
        <Button onClick={resetOnClick} type="danger">초기화</Button>
        </div>
      </LayoutHeader>
      {children}
      <LayoutFooter>HYM : Team DPengers</LayoutFooter>
    </LayoutWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default withRouter(AppLayout);
