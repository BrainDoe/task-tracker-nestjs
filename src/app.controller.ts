import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode} from '@nestjs/common';
import { AppService } from './app.service';
import { data, IData, ReportType } from 'src/data';
import { v4 as uuid } from 'uuid'

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getReports(@Param('type') type: ReportType) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE 
    return data.report.filter(report => report.type === reportType)
  }

  @Get('/:id')
  getReportById(@Param('type') type: ReportType, @Param('id') id: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE 
    return data.report.filter(report => report.type === reportType).find(report => report.id === id)
  }

  @Post()
  createReport(@Param('type') type: ReportType, @Body() { source, amount }: { source: string, amount: number}) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date,
      updated_at: new Date,
      type: type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    } 

    data.report.push(newReport)
    return newReport
  }

  @Put('/:id')
  updateReport(
    @Param('type') type: ReportType, 
    @Param('id') id: string,
    @Body() { source, amount }: {source: string, amount: number}) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE 
    const reportToUpdate = data.report.filter(report => report.type === reportType).find(report => report.id === id)

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

  @HttpCode(204)
  @Delete('/:id')
  deleteReport(@Param() id: string) {
    const reportIndex = data.report.findIndex(report => report.id === id)
    if(reportIndex === -1) return

    data.report.splice(reportIndex, 1);
    return;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
