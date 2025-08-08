

export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string, t: any): Group[] {

  console.log("Current pathname:", pathname);
  return [
    {
      groupLabel: t(""),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard",
          label: t("dashboard"),
          active: pathname.startsWith("/dashboard"),
          icon: "heroicons:banknotes",
          submenus: [],
        },
        {
          id: "requisitions",
          href: "/requisitions",
          label: t("requisitions"),
          active: pathname.startsWith("/requisitions"),
          icon: "heroicons:clipboard-document-check",
          submenus: [],
        },
        {
          id: "candidates",
          href: "/candidates",
          label: t("candidates"),
          active: pathname.startsWith("/candidates"),
          icon: "heroicons:user-group",
          submenus: [],
        }
      ],
    },
  ];
}

export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: t("Menu"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard",
          label: t("dashboard"),
          active: pathname.includes("/dashboard"),
          icon: "heroicons-outline:home",
          submenus: [],
        },
        {
          id: "candidates",
          href: "/candidates",
          label: t("candidates"),
          active: pathname.includes("/candidates"),
          icon: "heroicons:user-group",
          submenus: [],
        },
        {
          id: "requisitions",
          href: "/requisitions",
          label: t("requisitions"),
          active: pathname.includes("/requisitions"),
          icon: "heroicons:clipboard-document-check",
          submenus: [],
        },
      ],
    },
  ];
}