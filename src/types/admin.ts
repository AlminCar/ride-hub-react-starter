
export type PendingUserType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  joinDate: string;
};

export type ReportedIssueType = {
  id: number;
  type: string;
  reporter: string;
  status: string;
  subject: string;
  date: string;
};