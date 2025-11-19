import React from "react";
import LiabilitiesAssetsPie from "./LiabilitiesAssetsPie";
import DailyTransactionBar from "./DailyTransactionBar";
import ReceivablePayableLine from "./ReceivablePayableLine";

export interface DashboardComponentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any;
}

const ReceivablePayableLineWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <ReceivablePayableLine  />;
};

const DailyTransactionBarWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <DailyTransactionBar  />;
};

const LiabilitiesAssetsPieWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <LiabilitiesAssetsPie  />;
};

// registry object
const DashboardComponentRegistry: Record<string, React.ComponentType<DashboardComponentProps>> = {
    ReceivableVsPayable: ReceivablePayableLineWrapper,
    DailyTransaction: DailyTransactionBarWrapper,
    LiabilitiesAssets: LiabilitiesAssetsPieWrapper,
};

export default DashboardComponentRegistry;
