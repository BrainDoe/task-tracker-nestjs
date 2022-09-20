export enum ReportType {
  INCOME = "income",
  EXPENSE = "expense",
}
export const data: IData = {
  report: [
    
  ],
}

export interface IData {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[]
}
