export interface DashboardCounters {
    candidates_billed: number;
    candidates_accepted: number;
    candidates_required: number;
}

type filter = {
    date: string[]
}

export interface DashboardListParams {
  selected_division: string,
  selected_customer: string,
  filter?: filter
}

interface DashboardCandidatesPerMonthItem {
  month: string;
  candidates_required: number;
  candidates_accepted: number;
  candidates_billed: number;
}

export interface DashboardCandidatesPerMounth {
  items: DashboardCandidatesPerMonthItem[];
}

export interface DashboardTopCustomers {
  name: string;
  candidates_required: number;
  candidates_accepted: number;
  completion_percentage: number;
}