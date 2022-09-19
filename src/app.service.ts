import { Injectable } from '@nestjs/common';
import { data, IData, ReportType } from 'src/data';
import { v4 as uuid } from 'uuid';

interface IReport {
  source: string;
  amount: number;
}

@Injectable()
export class AppService {

  getReports(type: ReportType) {
    return data.report.filter(report => report.type === type)
  }

  getReportById(type: ReportType, id: string) { 
    return data.report.filter(report => report.type === type).find(report => report.id === id)
  }

  createReport(type: ReportType, {source, amount}: IReport) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date,
      updated_at: new Date,
      type
    } 

    data.report.push(newReport)
    return newReport
  }

  updateReport(type: ReportType, id: string, { source, amount }: IReport) {
    const reportToUpdate = data.report.filter(report => report.type === type).find(report => report.id === id)

    if(!reportToUpdate) return;

    const reportIndex = data.report.findIndex(report => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      source,
      amount,
      updated_at: new Date()
    }

    return data.report[reportIndex]
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id)
    if(reportIndex === -1) return

    data.report.splice(reportIndex, 1);
    return;
  }
}
