import { StatisticsBlock } from "@/components/blocks/statistics-block";
import { useCandidatesCounters } from "../hooks/use-candidates-counters";

export const CandidatesCounters = () => {

  const { counters } = useCandidatesCounters()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <StatisticsBlock
        title="Presented"
        total={counters?.in_progress ?? 0}
        className="bg-primary/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#2563eb"
      />
      <StatisticsBlock
        title="In Interview"
        total={counters?.interview ?? 0}
        className="bg-primary/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#2563eb"
      />
      <StatisticsBlock
        title="Accepted"
        total={counters?.accepted ?? 0}
        className="bg-green-100 dark:bg-green-200/10 text-green-700 dark:text-green-300 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#34D399"
      />
      <StatisticsBlock
        title="Billed"
        total={counters?.billed ?? 0}
        className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#A78BFA"
      />
    </div>
  );
};
