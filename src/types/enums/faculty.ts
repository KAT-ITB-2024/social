export enum FacultyEnum {
  FITB = 'FITB',
  FMIPA = 'FMIPA',
  FSRD = 'FSRD',
  FTMD = 'FTMD',
  FTTM = 'FTTM',
  FTSL = 'FTSL',
  FTI = 'FTI',
  SAPPK = 'SAPPK',
  SBM = 'SBM',
  SF = 'SF',
  SITH = 'SITH',
  STEI = 'STEI',
}

export type FacultyEnumType = keyof typeof FacultyEnum;
