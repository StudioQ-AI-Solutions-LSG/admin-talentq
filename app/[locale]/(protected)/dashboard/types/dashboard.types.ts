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

export interface DashboardStats {
  total_requisitions: RequisitionStat;
  total_candidates: CandidateStat;
  budget_billed_candidates: BudgetStat;
}

interface RequisitionStat {
  count: number;
  countLastPeriod: number;
  percentage_last_period: number;
}

interface CandidateStat {
  count: number;
  countLastPeriod: number;
  percentage_last_period: number;
}

interface BudgetStat {
  amount: number;
  amountLastPeriod: number;
  percentage_last_period: number;
}