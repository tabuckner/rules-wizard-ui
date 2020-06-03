import { LevelTypes } from '../enums/level-types.enum';

export interface RuleExample {
  id: number;
  ruleName: string;
  sql: string;
  message: string;
  level: LevelTypes;
  ruleText?: string;
}
