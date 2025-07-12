import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column('decimal')
  income: number;

  @Column()
  numberOfDependents: number;

  @Column()
  riskTolerance: string;

  @Column()
  recommendation: string;

  @Column()
  explanation: string;

  @CreateDateColumn()
  createdAt: Date;
}
