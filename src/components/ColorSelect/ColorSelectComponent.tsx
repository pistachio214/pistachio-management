import React from "react";
import { Col, ColorPicker, Popover, Row, Space, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ThemeState } from "@/redux/types/Theme";
import { RootState } from "@/redux/store";
import { changeColor, changeGradient } from "@/redux/slice/theme"

const ColorSelectComponent: React.FC = () => {
    const themeState: ThemeState = useAppSelector((state: RootState) => ({...state.theme}), shallowEqual);

    const dispatch = useAppDispatch();

    return (
        <Popover
            trigger="click"
            content={
                <Row justify={"center"} align={"middle"}>
                    <Space>
                        <ColorCol>
                            <span>主题</span>
                            <ColorPicker
                                value={themeState.config.token.colorPrimary}
                                onChange={(_, hex) =>
                                    dispatch(changeColor(hex))
                                }
                            />
                        </ColorCol>
                        <ColorCol>
                            <span>渐变</span>
                            <ColorPicker
                                value={themeState.deepcolor}
                                onChange={(_, hex) =>
                                    dispatch(changeGradient(hex))
                                }
                            />
                        </ColorCol>
                    </Space>
                </Row>
            }
        >
            <Button>
                <ClearOutlined/>
            </Button>
        </Popover>
    );
};

const ColorCol = styled(Col)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export default React.memo(ColorSelectComponent);