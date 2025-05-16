import { StatisticsBlock } from "@/components/blocks/statistics-block";

export const CandidatesCounters = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <StatisticsBlock
        title="Total Presented"
        total="10"
        className="bg-primary/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#2563eb"
      />
      <StatisticsBlock
        title="Total Interview"
        total="5"
        className="bg-primary/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#2563eb"
      />
      <StatisticsBlock
        title="Total Accepted"
        total="2"
        className="bg-green-100 text-green-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#34D399"
      />
      <StatisticsBlock
        title="Total Billed"
        total="2"
        className="bg-purple-100 text-purple-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#A78BFA"
      />
    </div>
  );
};
