

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

  return [
    {
      groupLabel: t("accounts"),
      id: "accounts",
      menus: [
        {
          id: "accounts",
          href: "/accounts",
          label: t("accounts"),
          active: pathname.includes("/accounts"),
          icon: "mdi:accounts-outline",
          submenus: [],
        },
      ],
    },
    
  ];
}
export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: t("accounts"),
      id: "accounts",
      menus: [
        {
          id: "accounts",
          href: "/accounts",
          label: t("accounts"),
          active: pathname.includes("/"),
          icon: "heroicons-outline:home",
          submenus:[],
        },
      ],
    },

    
  ];
}