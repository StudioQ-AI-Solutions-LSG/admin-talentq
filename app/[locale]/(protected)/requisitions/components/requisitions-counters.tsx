import { StatisticsBlock } from "@/components/blocks/statistics-block";
import { useRequisitionsCounters } from "../hooks/use-requisitions-counters";

export const RequisitionsCounters = () => {
  const { counters } = useRequisitionsCounters();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <StatisticsBlock
        title="New"
        total={counters?.new ?? 0}
        className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#A78BFA" // purple-300
      />
      <StatisticsBlock
        title="In Progress"
        total={counters?.in_progress ?? 0}
        className="bg-primary/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#2563eb"
      />
      <StatisticsBlock
        title="Closed"
        total={counters?.closed ?? 0}
        className="bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-100 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#94a3b8" // slate-400
      />
      <StatisticsBlock
        title="Closed by Customer"
        total={counters?.closed_by_customer ?? 0}
        className="bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#fda4af" // rose-300
      />
    </div>
  );
};
