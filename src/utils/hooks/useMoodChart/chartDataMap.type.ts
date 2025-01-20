import { ChartView } from "../../../enum/chartView";
import { ChartDataEntry } from "./chartDataEntry.interface";

export type ChartDataMap = {
  [key in ChartView]: ChartDataEntry;
};
