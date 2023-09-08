import React from "react";

import { DashboardContainer } from "@/pages/dashboard/style";
import IntroduceRowComponent from "@/pages/dashboard/IntroduceRowComponent";
import SalesCardComponent from "@/pages/dashboard/SalesCardComponent";

const Dashboard: React.FC = () => {

    return (
        <DashboardContainer>
            <IntroduceRowComponent/>

            <SalesCardComponent/>
        </DashboardContainer>
    );
}

export default Dashboard;