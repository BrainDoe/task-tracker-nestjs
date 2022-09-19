import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from 'src/data';
import { ReportDTO, UpdateReportDTO } from 'src/dtos/report.dto';

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE 
    return this.appService.getReports(reportType);
  }

  @Get('/:id')
  getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE 
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string, 
    @Body() {source, amount}: ReportDTO) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.appService.createReport(reportType, {source, amount});
  }

  @Put('/:id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string, 
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { source, amount }: UpdateReportDTO) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE 
    return this.appService.updateReport(reportType, id, { source, amount });
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }

}
