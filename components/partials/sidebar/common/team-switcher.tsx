"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { ChevronsUpDown, Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConfig } from "@/hooks/use-config";
import { motion } from "framer-motion";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import { useAccounts } from "@/hooks/use-accounts";
import { useCandidatesStore } from "@/store/candidate.store";
import { useRequisitionsStore } from "@/store/requisition.store";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [config] = useConfig();
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const { accounts, isLoading, error, refetch } = useAccounts({
    selected_division: "4f02cd07-316a-42c7-a3f8-38223d32dcba",
  });

  const { setParams: setCandidatesStore, selected_customer_name } =
    useCandidatesStore();
  const { setParams: setRequisitionsStore } = useRequisitionsStore();

  if (config.showSwitcher === false || config.sidebar === "compact") {
    return null;
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <motion.div
            key={config.collapsed && !hovered ? "collapsed" : "expanded"}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {config.collapsed && !hovered ? (
              <Button
                variant="outline"
                color="secondary"
                role="combobox"
                fullWidth
                aria-expanded={open}
                aria-label="Select a team"
                className={cn(
                  "  h-14 w-14 mx-auto  p-0 md:p-0  dark:border-secondary ring-offset-sidebar",
                  className
                )}
              >
                <Avatar className="">
                  <AvatarImage
                    height={24}
                    width={24}
                    src="/images/avatar/av-1.jpg"
                    alt={selected_customer_name}
                    className="grayscale"
                  />

                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button
                variant="outline"
                color="secondary"
                role="combobox"
                fullWidth
                aria-expanded={open}
                aria-label="Select a team"
                className={cn(
                  "  h-auto py-3 md:px-3 px-3 justify-start dark:border-secondary ring-offset-sidebar",
                  className
                )}
              >
                <div className=" flex  gap-2 flex-1 items-center">
                  <Avatar className=" flex-none h-[38px] w-[38px]">
                    <AvatarImage
                      height={38}
                      width={38}
                      src="/images/avatar/av-1.jpg"
                      alt=""
                      className="grayscale"
                    />

                    <AvatarFallback>
                      {session?.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-start w-[100px]">
                    <div className=" text-sm  font-semibold text-default-900">
                      John Doe
                    </div>
                    <div className=" text-xs font-normal text-default-500 dark:text-default-700 truncate ">
                      {selected_customer_name}
                    </div>
                  </div>
                  <div className="">
                    <ChevronsUpDown className="ml-auto h-5 w-5 shrink-0  text-default-500 dark:text-default-700" />
                  </div>
                </div>
              </Button>
            )}
          </motion.div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput
                placeholder="Search account..."
                className=" placeholder:text-xs"
              />
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="ml-2 text-sm">Loading accounts...</span>
                </div>
              ) : error ? (
                <div className="p-4 text-sm text-red-500">
                  <p>Error: {error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => refetch()}
                  >
                    Retry
                  </Button>
                </div>
              ) : accounts.length === 0 ? (
                <CommandEmpty>No accounts found.</CommandEmpty>
              ) : (
                <CommandGroup heading="Customer Accounts">
                  <CommandItem
                    key="all-accounts"
                    onSelect={() => {
                      setOpen(false);
                      setCandidatesStore({
                        selected_customer: "",
                        selected_customer_name: "All Accounts",
                      });
                      setRequisitionsStore({
                        selected_customer: "",
                      });
                    }}
                    className="text-sm font-normal"
                  >
                    All Accounts
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selected_customer_name === null
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                  {accounts.map((account) => (
                    <CommandItem
                      key={account.id}
                      onSelect={() => {
                        setOpen(false);
                        setCandidatesStore({
                          selected_customer: account.id,
                          selected_customer_name: account.name,
                        });
                        setRequisitionsStore({
                          selected_customer: account.id,
                        });
                      }}
                      className="text-sm font-normal"
                    >
                      {account.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selected_customer_name === account.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
            <CommandSeparator />
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
