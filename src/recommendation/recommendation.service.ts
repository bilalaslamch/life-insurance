import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRecommendationDto,
  RiskTolerance,
} from './dto/create-recommendation.dto';
import { UserSubmission } from './entity/user-submission.entity';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(UserSubmission)
    private readonly submissionRepo: Repository<UserSubmission>,
  ) {}

  async generateRecommendation(dto: CreateRecommendationDto) {
    // Simple rule-based logic for demo purposes
    let recommendation = '';
    let explanation = '';

    if (dto.age < 40 && dto.riskTolerance === RiskTolerance.HIGH) {
      recommendation = 'Term Life – $500,000 for 20 years';
      explanation =
        'Young age with high risk tolerance makes term life cost-effective and flexible.';
    } else if (dto.age >= 40 || dto.riskTolerance === RiskTolerance.LOW) {
      recommendation = 'Whole Life – $250,000';
      explanation =
        'Whole life provides stability and cash value for older age or lower risk preference.';
    } else {
      recommendation = 'Universal Life – $300,000';
      explanation =
        'A balanced option offering flexibility and investment potential.';
    }

    const submission = this.submissionRepo.create({
      ...dto,
      recommendation,
      explanation,
    });
    await this.submissionRepo.save(submission);

    return { recommendation, explanation };
  }
}
