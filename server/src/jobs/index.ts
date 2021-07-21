import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entities';
import { JobService } from './services';
import { CategoryController } from './controllers';

@Module({
    imports: [TypeOrmModule.forFeature([Job])],
    providers: [JobService],
    controllers: [CategoryController],
})
export class JobModule {}
