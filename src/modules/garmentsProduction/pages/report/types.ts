export interface ManPower {
    op: number;
    hp: number;
    im: number;
}

export interface HourlyProduction {
    [key: string]: number;
}

export interface LineData {
    line: string;
    lineChief: string; // for graphs
    buyer: string;
    style: string;
    po: string;
    itemType: string;
    styleName: string;
    startDay: string;
    runningDay: number;
    requiredManPower: ManPower;
    presentManPower: ManPower;
    totalTarget: number;
    tgtPerHour: number;
    targetEff: string;
    actualHour: number;
    hourlyProduction: HourlyProduction;
    totalAchieve: number;
    produceMin: number;
    availMin: number;
    difference: number;
    efficiency: string;
    coummentCount: number;
}

export interface FloorData {
    floorName: string;
    lines: LineData[];
}

export interface MetaData {
    date: string;
    totalManpower: number;
    averageWorkingHour: number;
    totalTarget: {
        cutting: number;
        sewing: number;
        finishing: number;
    };
    totalAchieved: {
        cutting: number;
        sewing: number;
        finishing: number;
    };
    difference: {
        cutting: number;
        sewing: number;
        finishing: number;
    };
}

// You don't have a separate FloorProduction or similar interface, so no change there.

export interface ProductionData {
    meta: MetaData;
    floors: FloorData[];
}
