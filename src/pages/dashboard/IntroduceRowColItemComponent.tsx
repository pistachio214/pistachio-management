import React from "react";
import { IntrolduceRowColItemContainer } from "@/pages/dashboard/style";

interface IProps {
    title: React.ReactNode
    action?: React.ReactNode
    content: React.ReactNode
    footer?: React.ReactNode
}

const IntroduceRowColItemComponent: React.FC<IProps> = (props: IProps) => {

    return (
        <IntrolduceRowColItemContainer>
            <div className={'item-title'}>
                <div className={'title-left'}>{props.title}</div>
                <div className={'title-right'}>
                    {
                        props.action ?? <></>
                    }
                </div>
            </div>
            <div className={'item-content'}>
                {props.content}
            </div>

            {
                props.footer ? (
                    <div className={'bottom-container'}>
                        {props.footer}
                    </div>
                ) : <></>
            }

        </IntrolduceRowColItemContainer>
    );
}

export default IntroduceRowColItemComponent;