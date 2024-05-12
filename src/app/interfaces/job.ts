export interface job {
  id: number;
  companyName: string; 
  jobTitle: string;
  location: string;
  salaryRange: string;
  minSalary: number;
  maxSalary: number;
  description: string;
  isSaved: boolean;
  pausedate?: Date; // Add pausedate attribute
}