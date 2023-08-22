import React, {useEffect} from "react";
import {Checkbox, Form, Input} from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    UserOutlined,
} from "@ant-design/icons";

import {useNavigate} from "react-router";
import {
    LoginContainer,
    LoginBg,
    LoginImage,
    LoginBox,
    Title,
    IconBox,
    LoginButton,
} from "@/pages/Login/style";
import {useAppSelector} from "@/redux/hook";
import {shallowEqual} from "react-redux";
import {ThemeState} from "@/redux/types/Theme";

import login_img from "@/assets/login_img.png";
import react_icon from "@/assets/react.svg";
import defaultSettings from "@/defaultSettings";
import {RootState} from "@/redux/store";

interface FormState {
    username: string;
    password: string;
    remember: boolean;
}

const Login: React.FC = () => {

    const navigate = useNavigate();

    const themeState: ThemeState = useAppSelector((state: RootState) => ({...state.theme}), shallowEqual);

    useEffect(() => {
        console.log(themeState);
    }, [themeState]);

    //表单数据
    const [form] = Form.useForm<FormState>();

    const rememberChecked = !!localStorage.getItem("rememberme");

    const onFinish = () => {
        form.validateFields().then(async () => {
            const data: FormState = form.getFieldsValue();
            console.log('form data = ', data);
            sessionStorage.setItem("token", "1");
            navigate('/');
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