export interface IProfileForm {
  id: string;
  name: string;
  email: string;
  riskScore: number;
  joinedAt: string;
  holdings: {
    type: string;
    value: number;
  }[];
  transactions: {
    id: string;
    type: string;
    status: string;
    date: string;
  }[];
  lastActionNote: string;
}
