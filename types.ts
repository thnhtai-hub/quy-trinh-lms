
export type Actor = 'Giáo viên' | 'Học sinh' | 'Phụ huynh';

export interface SubStep {
  id: string;
  title: string;
  actor: Actor;
  benefits?: string[];
  why?: string[];
  notes?: string[];
}

export interface Step {
  id: number;
  title: Actor;
  subtitle: string;
  subSteps: SubStep[];
}