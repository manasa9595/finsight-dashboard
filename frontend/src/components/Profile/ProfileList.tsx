import { Container, Typography, Button, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import type { IProfileForm } from "../../common/types/Profile";
import { ROUTES } from "../../common/constants";
import PaginatedTable from "../../common/components/PaginatedTable";

export default function ProfileList() {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Profiles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(ROUTES.NEW_PROFILE)}
        >
          Add Profile
        </Button>
      </Box>

      <PaginatedTable<IProfileForm>
        endpoint="api/profiles"
        defaultSortBy="joinedAt"
        defaultSortOrder="desc"
        rowsPerPageOptions={[5, 10, 25, 50]}
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "email", label: "Email", sortable: true },
          { key: "riskScore", label: "Risk Score", sortable: true },
          {
            key: "joinedAt",
            label: "Joined",
            sortable: true,
            render: (profile) =>
              new Date(profile.joinedAt).toLocaleDateString(),
          },
        ]}
        rowActions={(profile) => (
          <IconButton
            color="primary"
            onClick={() => navigate(`/profiles/${profile.id}`)}
          >
            <EditIcon />
          </IconButton>
        )}
      />
    </Container>
  );
}
