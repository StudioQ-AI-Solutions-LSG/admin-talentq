import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequisitionFilter } from "../types/requisitions.types";

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
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select a Requisition..." />
        </SelectTrigger>
        <SelectContent>
          {requisitions.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.custom_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
