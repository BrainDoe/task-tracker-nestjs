import { Injectable } from '@nestjs/common';
import { data, IData, ReportType } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDTO } from './dtos/report.dto';

interface IReport {
  source: string;
  amount: number;
}

interface IUpdateReport {
  source?: string;
  amount?: number;
}

@Injectable()
export class AppService {

  getReports(type: ReportType): ReportResponseDTO[] {
    return data.report.filter(report => report.type === type).map(report => new ReportResponseDTO(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDTO{ 
    const report =  data.report.filter(report => report.type === type).find(report => report.id === id)
    if(!report) return;

    return new ReportResponseDTO(report);
  }

  createReport(type: ReportType, {source, amount}: IReport): ReportResponseDTO {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date,
      updated_at: new Date,
      type
    } 

    data.report.push(newReport)
    return new ReportResponseDTO(newReport)
  }

  updateReport(type: ReportType, id: string, { source, amount }: IUpdateReport): ReportResponseDTO {
    const reportToUpdate = data.report.filter(report => report.type === type).find(report => report.id === id)

    if(!reportToUpdate) return;

    const reportIndex = data.report.findIndex(report => report.id === reportToUpdate.id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      source,
      amount,
      updated_at: new Date()
    }

    return new ReportResponseDTO(data.report[reportIndex])
  }

  deleteReport(id: string): void {
    const reportIndex = data.report.findIndex(report => report.id === id)
    if(reportIndex === -1) return

    data.report.splice(reportIndex, 1);
    return;
  }
}
