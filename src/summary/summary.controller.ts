import { SummaryService } from './summary.service';
import { Controller, Get } from '@nestjs/common';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  calculateSummary() { 
    return this.summaryService.calculateSummary();
  }
}
