"use client";

import { useConfig } from "@/hooks/use-config";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RevenueBarChartProps {
  height?: number;
  chartType?: "bar" | "area";
  series?: any[];
  chartColors?: string[];
}

const defaultSeries = [
  {
    name: "Net Profit",
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
  {
    name: "Revenue",
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  },
  {
    name: "Free Cash Flow",
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  },
];

const data = {
  items: [
    {
      month: "Feb",
      candidates_required: 452,
      candidates_accepted: 42,
      candidates_billed: 30,
    },
    {
      month: "Mar",
      candidates_required: 427,
      candidates_accepted: 61,
      candidates_billed: 37,
    },
    {
      month: "Apr",
      candidates_required: 92,
      candidates_accepted: 21,
      candidates_billed: 14,
    },
    {
      month: "May",
      candidates_required: 146,
      candidates_accepted: 36,
      candidates_billed: 10,
    },
    {
      month: "Jun",
      candidates_required: 69,
      candidates_accepted: 12,
      candidates_billed: 0,
    },
    {
      month: "Jul",
      candidates_required: 29,
      candidates_accepted: 4,
      candidates_billed: 0,
    },
  ],
};

const categories = data.items.map((item) => item.month);

const series = [
  {
    name: "Candidates Required",
    data: data.items.map((item) => item.candidates_required),
  },
  {
    name: "Candidates Accepted",
    data: data.items.map((item) => item.candidates_accepted),
  },
  {
    name: "Candidates Billed",
    data: data.items.map((item) => item.candidates_billed),
  },
];

const RevenueBarChart = ({
  height = 400,
  chartType = "bar",
  series = defaultSeries,
  chartColors = ["#4669FA", "#0CE7FA", "#FA916B"],
}: RevenueBarChartProps) => {
  const [config] = useConfig();
  const { isRtl } = config;
  const t = useTranslations("AnalyticsDashboard");
  const { theme: mode } = useTheme();
  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "45%",
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      fontFamily: "Inter",
      offsetY: -30,
      markers: {
        width: 8,
        height: 8,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      labels: {
        colors: mode === "dark" ? "#CBD5E1" : "#475569",
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
    },
    title: {
      text: `${t("revenue_report")}`,
      align: "left",
      offsetY: 13,
      offsetX: isRtl ? "0%" : 0,
      floating: false,
      style: {
        fontSize: "1.2 rem", // text-2xl
        fontWeight: 600, // font-semibold
        lineHeight: "1", // leading-none
        letterSpacing: "-0.01562em", // tracking-tight
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
        color: mode === "dark" ? "#fff" : "#0f172a",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    yaxis: {
      labels: {
        style: {
          colors: mode === "dark" ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      categories: series[0].data.map(
        (_: any, idx: any) => data.items[idx]?.month || ""
      ),
      labels: {
        style: {
          colors: mode === "dark" ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: mode === "dark" ? "dark" : "light", // adjusts background and text automatically
      y: {
        formatter: function (val: number, opts: any) {
          const seriesName =
            opts.seriesIndex === 0
              ? "Candidates Required"
              : opts.seriesIndex === 1
              ? "Candidates Accepted"
              : "Candidates Billed";

          return `${seriesName}: ${val}`;
        },
      },
    },
    colors: chartColors,
    grid: {
      show: false,
      borderColor: mode === "dark" ? "#334155" : "#E2E8F0",
      strokeDashArray: 10,
      position: "back",
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            position: "bottom",
            offsetY: 8,
            horizontalAlign: "center",
          },
          plotOptions: {
            bar: {
              columnWidth: "80%",
            },
          },
        },
      },
    ],
  };
  return (
    <Chart
      options={options}
      series={series}
      type={chartType}
      height={height}
      width={"100%"}
    />
  );
};

export default RevenueBarChart;
