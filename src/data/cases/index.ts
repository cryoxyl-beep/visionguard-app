import { CaseData, CaseId } from '../../types/game';
import { case1Data } from './case1';
import { case2Data } from './case2';
import { case3Data } from './case3';
import { case4Data } from './case4';
import { case5Data } from './case5';

export const allCases: Record<CaseId, CaseData> = {
  case1: case1Data,
  case2: case2Data,
  case3: case3Data,
  case4: case4Data,
  case5: case5Data,
};

export const caseList: CaseData[] = [
  case1Data,
  case2Data,
  case3Data,
  case4Data,
  case5Data,
];
