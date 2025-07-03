// components/ProfileForm.tsx
import React from "react";
import { TextField, Grid, Typography, Divider, Paper } from "@mui/material";
import type { IProfileForm } from "../../common/types/Profile";

interface Props {
  profile: IProfileForm;
  onChange: (updated: IProfileForm) => void;
  readOnly?: boolean;
}

const ProfileForm: React.FC<Props> = ({ profile, onChange, readOnly }) => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Client Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item={true} xs={12} md={6}>
          <TextField
            label="Name"
            value={profile.name}
            onChange={(e) => onChange({ ...profile, name: e.target.value })}
            fullWidth
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            value={profile.email}
            onChange={(e) => onChange({ ...profile, email: e.target.value })}
            fullWidth
            disabled={readOnly}
            type="email"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Risk Score"
            type="number"
            value={profile.riskScore}
            onChange={(e) =>
              onChange({ ...profile, riskScore: Number(e.target.value) })
            }
            fullWidth
            disabled={readOnly}
            inputProps={{ min: 0, max: 100 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Joined At"
            type="date"
            value={profile.joinedAt.slice(0, 10)} // ISO date
            onChange={(e) =>
              onChange({
                ...profile,
                joinedAt: new Date(e.target.value).toISOString(),
              })
            }
            fullWidth
            disabled={readOnly}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="subtitle1" gutterBottom>
        Reviewer Notes
      </Typography>
      <TextField
        label="Last Action Note"
        value={profile.lastActionNote}
        onChange={(e) =>
          onChange({ ...profile, lastActionNote: e.target.value })
        }
        fullWidth
        multiline
        rows={3}
        disabled={readOnly}
      />

      {/* You can expand this section to handle holdings + transactions too */}
    </Paper>
  );
};

export default ProfileForm;
