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
    return this.appService.getReports(reportType);
  }

  @Get('/:id')
  getReportById(@Param('type') type: ReportType, @Param('id') id: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE 
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(@Param('type') type: ReportType, @Body() {source, amount}: { source: string, amount: number}) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.createReport(reportType, {source, amount});
  }

  @Put('/:id')
  updateReport(
    @Param('type') type: ReportType, 
    @Param('id') id: string,
    @Body() { source, amount }: {source: string, amount: number}) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE 
    return this.appService.updateReport(reportType, id, { source, amount });
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteReport(@Param() id: string) {
    return this.appService.deleteReport(id);
  }

}
