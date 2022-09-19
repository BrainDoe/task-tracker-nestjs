export enum ReportType {
  INCOME = "income",
  EXPENSE = "expense",
}
export const data: IData = {
  report: [
    {
      id: 'uuid1', 
      source: 'Salary',
      amount: 400,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: 'uuid2', 
      source: 'Sales',
      amount: 400,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    },
    {
      id: 'uuid3', 
      source: 'Food',
      amount: 400,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE
    }
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
