import React from "react";

import { DashboardContainer } from "@/pages/dashboard/style";
import IntroduceRowComponent from "@/pages/dashboard/IntroduceRowComponent";
import SalesCardComponent from "@/pages/dashboard/SalesCardComponent";
import ThreeClassComponent from "@/pages/dashboard/ThreeClassComponent";

const Dashboard: React.FC = () => {

    return (
        <DashboardContainer>
            <IntroduceRowComponent/>

            <SalesCardComponent/>

            <ThreeClassComponent />
        </DashboardContainer>
    );
}

export default Dashboard;