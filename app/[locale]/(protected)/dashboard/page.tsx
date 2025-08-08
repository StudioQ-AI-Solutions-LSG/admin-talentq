"use client";
import { StatusBlock } from "@/components/blocks/status-block";
import DashboardDropdown from "@/components/dashboard-dropdown";
import OrdersBlock from "@/components/blocks/orders-block";
import EarningBlock from "@/components/blocks/earning-block";
import Customer from "./components/customer";
import RecentOrderTable from "./components/recent-order-table";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemo } from "react";
import { usePathname } from "@/components/navigation";
import { cn } from "@/lib/utils";

import { useDashboardCounters } from "./hooks/use-dashboard-counters";
import { useDashboardCandidatesPerMounth } from "./hooks/use-dashboard-candidates-per-mounth";
import { useDashboardTopCustomers } from "./hooks/use-dashboard-top-customers";
import RevenueBarChart from "@/components/revenue-bar-chart";
import { useDashboardStats } from "./hooks/use-dashboard-stats";
import DateRangePicker from "@/components/date-range-picker";
import DashboardDateRangePicker from "./components/dashboard-date-range-picker";
import { useDashboardStore } from "@/store/dashboard.store";

const DashboardPage = () => {
  const { counters } = useDashboardCounters();
  const { candidates, isLoading: loadingCandidates } = useDashboardCandidatesPerMounth();
  const { customers, isLoading: loadingCustomers } = useDashboardTopCustomers();
  const { stats } = useDashboardStats();
  const { setParams: setDashboardStore, filter } = useDashboardStore();

  const user = useAuthStore((state) => state.user);
  const userName = useMemo(() => user?.name || "User", [user?.name]);

  const series = candidates?.items?.length
    ? [
        {
          name: "Candidates Required",
          data: candidates.items.map((item: any) => item.candidates_required),
        },
        {
          name: "Candidates Accepted",
          data: candidates.items.map((item: any) => item.candidates_accepted),
        },
        {
          name: "Candidates Billed",
          data: candidates.items.map((item: any) => item.candidates_billed),
        },
      ]
    : [];

  const handleDatePickerChange = (value: string[]) => {
    setDashboardStore({
      filter: {
        date: value,
      },
    });
  };

  console.log("dates filter. " + filter?.date);

  const t = useTranslations("EcommerceDashboard");

  return (
    <div className="space-y-5">
      {/* Start of counters*/}
      <div className={cn("flex flex-wrap gap-4 items-center justify-end")}>
        <button
          onClick={() => {
            handleDatePickerChange([]);
          }}
          className="text-sm px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200"
        >
          Clear
        </button>
        <div className="text-2xl font-medium text-default-800 capitalize"></div>
        <DashboardDateRangePicker onChange={handleDatePickerChange}/>
      </div>
      <Card>
        <CardContent className=" p-6">
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
            <div className="flex space-x-4 h-full items-center rtl:space-x-reverse">
              <div className="flex-none">
                <Avatar className="h-20 w-20 bg-transparent hover:bg-transparent">
                  <AvatarImage src="/images/avatar/av-1.jpg" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <h4 className="text-xl font-medium mb-2">
                  <span className="block font-light text-default-800">
                    {t("widget_title")},
                  </span>
                  <span className="block text-default-900">{userName}</span>
                </h4>
                <p className="text-sm text-default-600">{t("widget_desc")}</p>
              </div>
            </div>
            {/*  status blocks */}
            <StatusBlock
              title="Candidates Required"
              total={counters?.candidates_required}
              chartColor="#4669FA"
              chartType="bar"
              className="bg-default-50 shadow-none border-none"
              opacity={1}
            />
            <StatusBlock
              title="Candidates Accepted"
              total={counters?.candidates_accepted}
              chartColor="#80fac1"
              className="bg-default-50 shadow-none border-none"
              series={[40, 70, 45, 100, 75, 40, 80, 90]}
              chartType="bar"
              opacity={1}
            />
            <StatusBlock
              title="Candidates Billed"
              total={counters?.candidates_billed}
              chartColor="#b019f1ff"
              className="bg-default-50 shadow-none border-none"
              chartType="bar"
              series={[40, 70, 45, 100, 75, 40, 80, 90]}
              opacity={1}
            />
          </div>
        </CardContent>
      </Card>
      {/* End of counters*/}

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          {/* Start Candidates per mounth*/}
          <Card>
            <CardContent className="pt-5">
              {candidates?.items?.length ? (
                <RevenueBarChart
                  chartType="bar"
                  height={400}
                  series={series}
                  chartColors={["#4669FA", "#80fac1", "#b019f1ff"]}
                  data={candidates}
                />
              ) : loadingCandidates ? (
                <p>Loading chart...</p>
              ) : <p>No data available...</p>}
            </CardContent>
          </Card>
        </div>
        {/* End Candidates per mounth*/}

        {/* Start of statistics*/}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-1">
              <CardTitle className="flex-1">{t("statistics")}</CardTitle>
              <DashboardDropdown />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2  gap-5">
                <div className="col-span-2 md:col-span-1">
                  <OrdersBlock
                    title={t("dashboard_stats_requisitions")}
                    total={stats?.total_requisitions?.count || 0}
                    chartColor="#f1595c"
                    percentageContent={
                      <span className="text-primary">
                        {stats?.total_requisitions?.percentage_last_period || 0}
                      </span>
                    }
                    className="border-none shadow-none bg-default-50 "
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <OrdersBlock
                    title={t("dashboard_stats_candidates")}
                    total={stats?.total_candidates?.count || 0}
                    chartColor="#4669fa"
                    chartType="line"
                    percentageContent={
                      <span className="text-primary">
                        {stats?.total_candidates?.percentage_last_period || 0}
                      </span>
                    }
                    className="border-none shadow-none bg-default-50 col-span-2 md:col-span-1"
                  />
                </div>
                <div className="col-span-2">
                  <EarningBlock
                    title={t("dashboard_stats_billed_candidates")}
                    total={new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(stats?.budget_billed_candidates?.amount ?? 0)}
                    percentage={
                      stats?.budget_billed_candidates?.percentage_last_period ||
                      0
                    }
                    className="col-span-2 border-none shadow-none bg-default-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* End of statistics*/}
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        {/* Start of Top Customers*/}
        <Card>
          <CardHeader className="flex flex-row items-center gap-1">
            <CardTitle className="flex-1">{t("customer")}</CardTitle>
            <DashboardDropdown />
          </CardHeader>
          <CardContent>
            {customers?.length ? (
              <Customer data={customers} />
            ) : loadingCustomers ? (
              <p>Loading chart...</p>
            ) : <p>No data available...</p>}
          </CardContent>
        </Card>
        {/* End of Top Customers*/}

        {/* Start of Recent Reqs*/}
        <Card>
          <CardHeader className="flex flex-row items-center gap-1">
            <CardTitle className="flex-1">
              {t("recent_order_table_title")}
            </CardTitle>
            <DashboardDropdown />
          </CardHeader>
          <CardContent className="px-0">
            <RecentOrderTable />
          </CardContent>
        </Card>
        {/* Start of Recent Reqs*/}
      </div>
      {/* 

      <div className="grid grid-cols-12  gap-5">
        <div className="lg:col-span-8 col-span-12">
          <Card>
            <CardHeader className="flex flex-row items-center gap-1">
              <CardTitle className="flex-1">{t("visitors_report")}</CardTitle>
              <DashboardDropdown />
            </CardHeader>
            <CardContent>
              <VisitorsReportChart height={350} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card>
            <CardHeader className="flex flex-row items-center gap-1">
              <CardTitle className="flex-1">
                {t("Visitors_by_gender")}
              </CardTitle>
              <DashboardDropdown />
            </CardHeader>
            <CardContent>
              <VisitorsChart />
            </CardContent>
          </Card>
        </div>
      </div> */}
      {/*       <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <MostSales />
        <Card>
          <CardHeader className="flex flex-row items-center gap-1">
            <CardTitle className="flex-1">
              {t("best_selling_products")}
            </CardTitle>
            <DashboardDropdown />
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
              {products.map((product, index) => (
                <Product key={index} product={product} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default DashboardPage;
