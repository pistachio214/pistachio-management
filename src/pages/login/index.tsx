import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {Checkbox, Form, Input, Image} from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
} from "@ant-design/icons";
import {message} from "@/components/Antd/EscapeAntd";

import {
    LoginContainer,
    LoginBg,
    LoginImage,
    LoginBox,
    Title,
    IconBox,
    LoginButton,
    CodeItemContainer,
} from "@/pages/login/style";
import {useAppSelector} from "@/redux/hook";
import {shallowEqual} from "react-redux";
import {ThemeState} from "@/redux/types/Theme";

import login_img from "@/assets/login_img.png";
import react_icon from "@/assets/react.svg";
import defaultSettings from "@/defaultSettings";
import {RootState} from "@/redux/store";
import {Captcha, CodeUuid, LoginParams, LoginResponse} from "@/types/auth";
import {getCaptcha, login} from "@/api/auth";
import {AxiosResponse} from "axios";

interface FormState {
    username: string;
    password: string;
    remember: boolean;
    code: string
}

const Login: React.FC = () => {

    const navigate = useNavigate();

    const themeState: ThemeState = useAppSelector((state: RootState) => ({...state.theme}), shallowEqual);

    const [codeState, setCodeState] = useState<CodeUuid>();

    useEffect(() => {
        console.log(themeState);
    }, [themeState]);

    useEffect(() => {
        getCodeImage();
    }, [])

    //表单数据
    const [form] = Form.useForm<FormState>();

    const rememberChecked = !localStorage.getItem("rememberme");

    // 获取验证码图片和uuid
    const getCodeImage = () => {
        getCaptcha().then((res: AxiosResponse<Captcha>) => {
            setCodeState({
                code: res.data.base64Img,
                uuid: res.data.token,
            })
        })
    }

    const onFinish = () => {
        form.validateFields().then(async () => {
            const data: FormState = form.getFieldsValue();
            let loginParam: LoginParams = {
                ...data,
                ...{
                    uuid: codeState?.uuid || ""
                }
            };
            login(loginParam).then((res: AxiosResponse<LoginResponse>) => {
                sessionStorage.setItem('tokenName', res.data.tokenName);
                sessionStorage.setItem('tokenValue', res.data.tokenValue);
                sessionStorage.setItem('tokenPrefix', res.data.tokenPrefix);

                message.success('🎉🎉🎉 登录成功', 1, () => {
                    navigate('/');
                });
            }).catch(() => {
                getCodeImage();
            })
        })
    }

    return (
        <LoginContainer>
            <LoginBg config={themeState.config} deepcolor={themeState.deepcolor}/>
            <LoginImage src={login_img} width={600} height={"auto"}></LoginImage>
            <LoginBox>
                <Title>
                    <IconBox src={react_icon}></IconBox>{defaultSettings.title}
                </Title>
                <div className={'title-description'}>{defaultSettings.titleDescription}</div>

                <Form
                    name="dynamic_rule"
                    form={form}
                    initialValues={{remember: rememberChecked}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: "请输入账号"}]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="账号(username)"
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: "请输入密码"}]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            placeholder="密码(password)"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="code"
                        rules={[{required: true, message: "请输入验证码"}]}
                    >
                        <CodeItemContainer>
                            <Input
                                prefix={<SafetyCertificateOutlined/>}
                                className={'code-item-input'}
                                placeholder="验证码(code)"
                                maxLength={5}
                            />
                            <div className={'code-item-image'} onClick={() => getCodeImage()}>
                                <Image
                                    height={35}
                                    src={codeState?.code}
                                    preview={false}
                                />
                            </div>
                        </CodeItemContainer>
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <LoginButton type="primary" htmlType="submit">
                            登录
                        </LoginButton>
                    </Form.Item>
                </Form>
            </LoginBox>
        </LoginContainer>
    )
}

export default Login;