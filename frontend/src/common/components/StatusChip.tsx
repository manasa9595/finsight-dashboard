import { Chip } from "@mui/material";
import { PENDING_ACTIONS_STATUS } from "../constants";

export type Status =
  | "Pending"
  | "Under Review"
  | "Approved"
  | "Rejected"
  | string;

interface Props {
  status: Status;
  size?: "small" | "medium";
}

export default function StatusChip({ status, size = "small" }: Props) {
  const color = (() => {
    switch (status.toLocaleLowerCase()) {
      case PENDING_ACTIONS_STATUS.PENDING:
        return "warning";
      case PENDING_ACTIONS_STATUS.UNDER_REVIEW:
        return "primary";
      case PENDING_ACTIONS_STATUS.APPROVED:
        return "success";
      case PENDING_ACTIONS_STATUS.REJECTED:
        return "error";
      default:
        return "default";
    }
  })();

  return <Chip label={status} color={color} size={size} />;
}
