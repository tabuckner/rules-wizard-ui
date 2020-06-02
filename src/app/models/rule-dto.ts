import { RuleTypes } from '../enums/rule-types.enum';
import { LevelTypes } from '../enums/level-types.enum';

export interface RuleDto {
  ruleType: RuleTypes;
  ruleName: string;
  sql: string;
  message: string;
  level: LevelTypes;
}
