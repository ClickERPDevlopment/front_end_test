import React from "react";
import DelayCausePieChart from "./DelayCausePieChart";
import PlanningCapacityBar from "./PlanningCapacityBar";
import TaskCompletionStatusBar from "./TaskCompletionStatusBar";
import TnaHeatmap from "./TnaHeatmap";
import TnaProgressLine from "./TnaProgressLine";
import TnaStatusPie from "./TnaStatusPie";

export interface DashboardComponentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config?: any;
}

const DelayCausePieChartWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <DelayCausePieChart />;
};

const PlanningCapacityBarWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <PlanningCapacityBar />;
};

const TaskCompletionStatusBarWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <TaskCompletionStatusBar />;
};

const TnaHeatmapWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <TnaHeatmap />;
};

const TnaProgressLineWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <TnaProgressLine />;
};

const TnaStatusPieWrapper: React.FC<DashboardComponentProps> = ({ config }) => {
    return <TnaStatusPie />;
};

// registry object
const DashboardComponentRegistry: Record<string, React.ComponentType<DashboardComponentProps>> = {
    DelayCause: DelayCausePieChartWrapper,
    PlanningCapacity: PlanningCapacityBarWrapper,
    TaskCompletionStatus: TaskCompletionStatusBarWrapper,
    TnaHeatmap: TnaHeatmapWrapper,
    TnaProgress: TnaProgressLineWrapper,
    TnaStatus: TnaStatusPieWrapper,
};

export default DashboardComponentRegistry;
