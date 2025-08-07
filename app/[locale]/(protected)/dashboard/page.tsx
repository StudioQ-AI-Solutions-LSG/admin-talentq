"use client";
import { StatusBlock } from "@/components/blocks/status-block";
import DashboardDropdown from "@/components/dashboard-dropdown";
import OrdersBlock from "@/components/blocks/orders-block";
import EarningBlock from "@/components/blocks/earning-block";
import Customer from "./components/customer";
import RecentOrderTable from "./components/recent-order-table";
import VisitorsReportChart from "./components/visitors-report";
import VisitorsChart from "./components/visitors-chart";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemo } from "react";

import { useDashboardCounters } from "./hooks/use-dashboard-counters";
import { useDashboardCandidatesPerMounth } from "./hooks/use-dashboard-candidates-per-mounth";
import { useDashboardTopCustomers } from "./hooks/use-dashboard-top-customers";
import RevenueBarChart from "@/components/revenue-bar-chart";

/* const data = {
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
}; */

/* const categories = data.items.map((item) => item.month); */

/* const series = [
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
]; */

const EcommercePage = () => {
  const { counters } = useDashboardCounters();
  const { candidates } = useDashboardCandidatesPerMounth();
  const { customers } = useDashboardTopCustomers();

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

  const t = useTranslations("EcommerceDashboard");

  return (
    <div className="space-y-5">
      {/* Start of counters*/}
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
              chartColor="#ffbf99"
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
                  chartColors={["#4669FA", "#0CE7FA", "#FA916B"]}
                />
              ) : (
                <p>Loading chart...</p>
              )}
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
                    title={t("orders")}
                    total="123k"
                    chartColor="#f1595c"
                    className="border-none shadow-none bg-default-50 "
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <OrdersBlock
                    title={t("profit")}
                    total="123k"
                    chartColor="#4669fa"
                    chartType="line"
                    percentageContent={
                      <span className="text-primary">+2.5%</span>
                    }
                    className="border-none shadow-none bg-default-50 col-span-2 md:col-span-1"
                  />
                </div>
                <div className="col-span-2">
                  <EarningBlock
                    title={t("earnings")}
                    total="$12,335.00"
                    percentage="+08%"
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
            {customers?.length ? (<Customer data={customers}/>) : (<p>Loading chart...</p>)}
            
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

export default EcommercePage;
