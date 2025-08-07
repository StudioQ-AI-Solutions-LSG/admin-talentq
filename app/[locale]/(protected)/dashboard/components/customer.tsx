"use client";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { DashboardTopCustomers } from "../types/dashboard.types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
const customers = [
  {
    name: "Nicole Kidman",
    img: "/images/all-img/cus-1.png",
    candidates_required: 70,
    candidates_accepted: 10,
    bg: "before:bg-info/30",
    barColor: "info",
    number: 2,
  },
  {
    name: "Monica Bellucci",
    img: "/images/all-img/cus-2.png",
    candidates_required: 90,
    candidates_accepted: 10,
    bg: "before:bg-warning/30",
    barColor: "warning",
    active: true,
    number: 1,
  },
  {
    name: "Pamela Anderson",
    img: "/images/all-img/cus-3.png",
    candidates_required: 65,
    candidates_accepted: 10,
    bg: "before:bg-success/30",
    barColor: "success",
    number: 3,
  },
  {
    name: "Dianne Russell",
    img: "/images/users/user-1.jpg",
    candidates_required: 60,
    candidates_accepted: 10,
    bg: "before:bg-info/30",
    barColor: "info",
    number: 4,
  },
  {
    name: "Robert De Niro",
    img: "/images/users/user-2.jpg",
    candidates_required: 50,
    candidates_accepted: 10,
    bg: "before:bg-warning/30",
    barColor: "warning",
    number: 5,
  },
  {
    name: "De Niro",
    img: "/images/users/user-3.jpg",
    candidates_required: 60,
    candidates_accepted: 10,
    bg: "before:bg-warning/30",
    barColor: "warning",
    number: 6,
  },
];

function buildCustomersArray(data: any) {
  const colorClasses = [
    { bg: "before:bg-info/30", barColor: "info" },
    { bg: "before:bg-success/30", barColor: "success" },
    { bg: "before:bg-warning/30", barColor: "warning" },
    { bg: "before:bg-danger/30", barColor: "danger" },
  ];

  return data.map((customer: any, index: any) => {
    const initials = customer.name
      .split(" ")
      .map((word: any) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const { bg, barColor } = colorClasses[index % colorClasses.length];

    return {
      name: customer.name,
      candidates_required: customer.candidates_required,
      candidates_accepted: customer.candidates_accepted,
      img: null, // You can render this as a circle with text
      number: index + 1,
      bg,
      barColor,
    };
  });
}

const CustomerList = ({ item }: any) => {
  const t = useTranslations("EcommerceDashboard");
  return (
    <div className="relative  p-4 rounded md:flex items-center  md:space-x-10 md:space-y-0 space-y-3 rtl:space-x-reverse">
      <div
        className={`${
          item.active ? "ring-2 ring-[#FFC155]" : ""
        } h-10 w-10 rounded-full relative`}
      >
        {item.active && (
          <span className="crown absolute -top-[14px] left-1/2 -translate-x-1/2">
            <Image
              width={40}
              height={40}
              className="w-7 h-7"
              src="/images/icon/crown.svg"
              alt=""
            />
          </span>
        )}
        <div className="relative">
          <Avatar className="rounded-full w-12 h-12 bg-transparent hover:bg-transparent shadow-none border-none">
            {item?.img ? (
              <AvatarImage src={item.img} />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-base font-medium text-primary dark:text-primary-foreground">
                  {item.name?.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </Avatar>

          <span className="h-4 w-4 absolute -right-1 -bottom-1 rounded-full bg-[#FFC155] border border-white flex items-center justify-center text-white text-[10px] font-medium">
            {item.number}
          </span>
        </div>
      </div>
      <h4 className="text-sm text-default-600 font-semibold">{item.name}</h4>
      <div className="inline-block text-center bg-default-900 text-default-100 px-2.5 py-1.5 text-xs font-medium rounded-full min-w-[60px]">
        {item.candidates_required}
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-sm font-normal  mb-3">
          <span>{t("progress")}</span>
          <span className="font-normal">{item.candidates_accepted}%</span>
        </div>
        <Progress
          value={item.candidates_accepted}
          color={item.barColor}
          size="sm"
        />
      </div>
    </div>
  );
};
const CustomerCard = ({ item }: any) => {
  const t = useTranslations("EcommerceDashboard");
  return (
    <div
      className={` relative z-1 text-center p-4 rounded before:w-full before:h-[calc(100%-60px)] before:absolute before:left-0 before:top-[60px] before:rounded before:z-[-1] ${item.bg}`}
    >
      <div
        className={`${
          item.active ? "ring-2 ring-[#FFC155]" : ""
        } h-[70px] w-[70px] rounded-full mx-auto mb-4 relative`}
      >
        {item.active && (
          <span className="crown absolute -top-[24px] left-1/2 -translate-x-1/2">
            <Image
              width={40}
              height={40}
              className="w-7 h-7"
              src="/images/icon/crown.svg"
              alt=""
            />
          </span>
        )}
        <div className="relative w-18 h-18">
          <Avatar className="rounded-full w-18 h-18 bg-white shadow-none border-none">
            {item?.img ? (
              <AvatarImage src={item.img} />
            ) : (
              <div className="h-12 w-12 rounded-full bg-[#3B82F6] flex items-center justify-center relative">
                <span className="text-base font-medium text-white">
                  {item.name?.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </Avatar>

          <span className="absolute -right-1 -bottom-1 w-5 h-5 rounded-full bg-[#FFC155] border-2 border-white flex items-center justify-center text-white text-[10px] font-medium">
            {item.number}
          </span>
        </div>
      </div>
      <h4 className="text-sm text-default-600 font-semibold mb-4">
        {item.name}
      </h4>
      <div className="inline-block bg-default-900 text-default-100 px-2.5 py-1.5 text-xs font-medium rounded-full min-w-[60px]">
        {item.candidates_required}
      </div>
      <div>
        <div className="flex justify-between text-sm font-normal  mb-3 mt-4">
          <span>{t("progress")}</span>
          <span className="font-normal">{item.candidates_accepted}%</span>
        </div>
        <Progress
          value={item.candidates_accepted}
          color={item.barColor}
          size="sm"
        />
      </div>
    </div>
  );
};

const Customer = ({ data }: any) => {
  const t = useTranslations("EcommerceDashboard");
  const customers = buildCustomersArray(data);

  return (
    <div className="pb-2">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {customers.slice(0, 3).map((item: any, i: any) => (
          <CustomerCard item={item} key={`customer-${i}`} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5">
        {customers.slice(3, 8).map((item: any, i: any) => (
          <CustomerList item={item} key={`customer-item-${i}`} />
        ))}
      </div>
    </div>
  );
};
export default Customer;
