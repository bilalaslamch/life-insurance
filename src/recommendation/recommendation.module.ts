import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { UserSubmission } from './entity/user-submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSubmission])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
