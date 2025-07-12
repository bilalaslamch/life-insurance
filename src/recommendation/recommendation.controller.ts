import { Body, Controller, Post } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  async createRecommendation(@Body() dto: CreateRecommendationDto) {
    return this.recommendationService.generateRecommendation(dto);
  }
}
