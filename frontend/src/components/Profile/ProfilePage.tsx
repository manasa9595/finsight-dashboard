import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import type { IProfileForm } from "../../common/types/Profile";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ROUTES } from "../../common/constants";

const defaultProfile: IProfileForm = {
  name: "",
  email: "",
  riskScore: 50,
  joinedAt: new Date().toISOString(),
  holdings: [],
  transactions: [],
  lastActionNote: "",
};

const ProfilePage = () => {
  const profileId = useParams()?.profileId ?? "new";
  const isNew = profileId === "new";
  const [profile, setProfile] = useState<IProfileForm>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/profile/${profileId}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [profileId, isNew]);

  const handleSave = async () => {
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/profile" : `/api/profile/${profileId}`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    navigate("/dashboard"); // or wherever
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isNew ? 'Create New Profile' : `Profile: ${profile.name}`}
      </Typography>

      <ProfileForm
        profile={profile}
        onChange={setProfile}
        readOnly={false}
      />

      <Box mt={4}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            {isNew ? 'Create' : 'Update'}
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.PROFILE)}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ProfilePage;
