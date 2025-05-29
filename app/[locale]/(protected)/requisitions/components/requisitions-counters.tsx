import { StatisticsBlock } from "@/components/blocks/statistics-block";

export const RequisitionsCounters = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <StatisticsBlock
        title="New"
        total="2"
        className="bg-purple-100 text-purple-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#A78BFA"
      />
      <StatisticsBlock
        title="In Progress"
        total="5"
        className="bg-primary/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#2563eb"
      />
      <StatisticsBlock
        title="Closed"
        total="10"
        className="bg-gray-200 text-gray-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#4b5563" // Tailwind gray-600, más oscuro para mejor contraste
      />
      <StatisticsBlock
        title="Closed by Customer"
        total="5"
        className="bg-red-100 text-red-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
        chartColor="#b91c1c" // Tailwind red-700, más oscuro para el gráfico
      />
    </div>
  );
};
