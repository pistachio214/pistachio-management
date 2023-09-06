import styled from "styled-components";
import {
    Layout, Menu, Tag
} from "antd";

import { Rotate } from "@/styles/global";
import { HeaderHeight } from "@/styles/config";
import { ThemeState } from "@/redux/types/Theme";

const {Sider, Header, Content} = Layout;

export const LaySider = styled(Sider)`
  height: 100vh;
  transition: all 0.3s;
`;

export const TitleLogo = styled.img`
  animation: ${Rotate} 4s linear infinite;
`;

export const SiderTitle = styled.div<ThemeState>`
  height: ${HeaderHeight};
  width: 100%;
  background-color: ${(props: {config: ThemeState["config"]}) =>
    props.config.token.colorPrimary};
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
`;

export const TitleFont = styled.div`
  white-space: nowrap;
  font-size: 18px;
  color: white;
  margin-left: 10px;
`;

export const LayContent = styled(Content)`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 1% 1% 1%;
  box-sizing: border-box;
`;

export const Container = styled.div`
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px #f0f1f2;
  padding: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  height: calc(100vh - 140px);
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: white;
  overflow-x: hidden;
`;


// SiderMenu *********************************************
export const MenuContainer = styled(Menu)<ThemeState>`
  background: linear-gradient(to bottom,
  ${(props: ThemeState) => props.config.token.colorPrimary},
  ${(props: ThemeState) => props.deepcolor});
  color: white;
  height: calc(100vh - ${HeaderHeight});
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LayHeader = styled(Header)`
  height: ${HeaderHeight};
  background-color: white;
  //下部阴影
  box-shadow: 0 2px 8px #f0f1f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const UserTag = styled(Tag)`
  height: 32px;
  line-height: 32px;
  font-size: 14px;
`;

// UserInfoDrawer *********************************
export const UploadContainer = styled.div`
`