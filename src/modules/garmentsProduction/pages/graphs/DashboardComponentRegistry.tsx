import React from "react";
import DefectRatePie from "./DefectRatePie";
import EfficiencyCard from "./EfficiencyCard";
import LineWiseOutputBar from "./LineWiseOutputBar";
import TargetVsActualChart from "./TargetVsActualChart";
import WIPBar from "./WIPBar";

export interface DashboardComponentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any;
}

const DefectRatePieWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <DefectRatePie  />;
};

const EfficiencyCardWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <EfficiencyCard efficiency={80}  />;
};

const LineWiseOutputBarWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <LineWiseOutputBar  />;
};

const TargetVsActualChartWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <TargetVsActualChart  />;
};

const WIPBarWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <WIPBar  />;
};

// registry object
const DashboardComponentRegistry: Record<string, React.ComponentType<DashboardComponentProps>> = {
    DefectRate: DefectRatePieWrapper,
    Efficiency: EfficiencyCardWrapper,
    LineWiseOutput: LineWiseOutputBarWrapper,
    TargetVsActual: TargetVsActualChartWrapper,
    WIP: WIPBarWrapper,
};

export default DashboardComponentRegistry;
