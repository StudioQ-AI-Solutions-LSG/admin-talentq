import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequisitionFilter } from "../types/requisitions-filter.types";

type CandidatesRequisitionFilterProps = {
  requisitions: RequisitionFilter[];
  selected_requisition_id: string | null;
  onChange: (id: string | null) => void;
};

export const CandidatesRequisitionFilter = ({
  requisitions,
  selected_requisition_id,
  onChange,
}: CandidatesRequisitionFilterProps) => {
  return (
    <div className="flex justify-center">
      <Select
        value={selected_requisition_id || ""}
        onValueChange={(value) => onChange(value ?? null)}
      >
        <SelectTrigger
          className="w-[250px] h-[40px] pl-3 pr-4 border border-gray-300 rounded-lg shadow-sm 
                      text-gray-400 text-xs
                      focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
                      data-[state=open]:ring-2 data-[state=open]:ring-primary data-[state=open]:border-transparent 
                      transition-none"
                            >
          <SelectValue placeholder="Select Requisition..." />
        </SelectTrigger>
        <SelectContent>
          {requisitions.length <= 0
            ? null
            : requisitions.map((item) => (
                <SelectItem
                  className="cursor-pointer px-4 py-2 data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-700"
                  key={item.id}
                  value={item.id}
                >
                  {item.custom_name}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </div>
  );
};
