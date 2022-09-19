import { Controller, Get, Post, Put, Delete, Param, Body} from '@nestjs/common';
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
    return newReport
  }

  @Put('/:id')
  updateReport() {
    return { id: 1, content: 'Updated Report' }
  }

  @Delete('/:id')
  deleteReport() {
    return 'Report Deleted';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
