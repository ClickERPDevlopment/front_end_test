/* eslint-disable @typescript-eslint/no-explicit-any */
export default function useAppCalculation() {

    function CalculateSum<T extends Record<string, any>>(arr: T[], key: keyof T): number {
        if (!arr || arr.length === 0) return 0;

        let sum = 0;
        for (const item of arr) {
            const value = Number(item[key]);
            if (!isNaN(value)) {
                sum += value;
            }
        }

        return sum;
    }

    function CalculateAverage<T extends Record<string, any>>(arr: T[], key: keyof T): number {
        if (!arr || arr.length === 0) return 0;

        let sum = 0;
        for (const item of arr) {
            const value = Number(item[key]);
            if (!isNaN(value)) {
                sum += value;
            }
        }

        return sum / arr.length;
    }


    return { CalculateSum, CalculateAverage };
}
