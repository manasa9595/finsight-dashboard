import StatusChip from "../../common/components/StatusChip";
import AmountFormatter from "../../common/components/AmountFormatter";
import { formatFirestoreTimestamp } from "../../common/components/DateFormatter";
import { Button } from "@mui/material";
import PaginatedTable from "../../common/components/PaginatedTable";

interface PendingAction {
  id: string;
  type: string;
  customer: string;
  amount: number | string;
  date: unknown;
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
}

export default function PendingActionsPage() {
  return (
    <PaginatedTable<PendingAction>
      endpoint="http://localhost:5050/api/pending-actions"
      defaultSortBy="date"
      columns={[
        { key: "customer", label: "Customer", sortable: true },
        {
          key: "amount",
          label: "Amount",
          sortable: true,
          render: (item) => <AmountFormatter amount={item.amount} />,
        },
        {
          key: "date",
          label: "Date",
          sortable: true,
          render: (item) => formatFirestoreTimestamp(item.date),
        },
        { key: "type", label: "Type" },
        {
          key: "status",
          label: "Status",
          render: (item) => <StatusChip status={item.status} />,
        },
      ]}
      rowActions={(item) => (
        <>
          <Button size="small" onClick={() => alert(`Approve ${item.id}`)}>
            Approve
          </Button>
          <Button size="small" onClick={() => alert(`Reject ${item.id}`)}>
            Reject
          </Button>
          <Button size="small" onClick={() => alert(`View ${item.id}`)}>
            View
          </Button>
        </>
      )}
    />
  );
}
