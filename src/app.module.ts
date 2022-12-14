import { ClassSerializerInterceptor, Module, NestInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from 'src/report/report.module';
import { SummaryModule } from 'src/summary/summary.module';
import { CustomInterceptor } from './interceptors/custom.interceptor'

@Module({
  imports: [ReportModule, SummaryModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }]
})
export class AppModule {}
