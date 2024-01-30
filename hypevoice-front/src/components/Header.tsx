import React from "react";
import HeaderBarComponent from "./HeaderBarComponent";
import styled from "styled-components";

const HeaderStyleDiv = styled.div`
  height: 80px;
  width: 100%;
`;

function Header() {
  return <HeaderStyleDiv>
            <HeaderBarComponent />
          </HeaderStyleDiv>
  
}

export default Header;
