import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { userSignupData } from "@/Apis/userApi/userAuthRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import axios from "axios";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {
        "By signing up, you agree to our terms and privacy policy. You must be at least 18 years old to start a page."
      }
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: "sans-serif",
  },
});

export default function CompletePage() {
  const router = useRouter();

  const [name, setName] = useState(false);
  const [nameErr, setNameErr] = useState("");
  const [userName, setUserName] = useState(false);
  const [userNameErr, setUserNameErr] = useState("");
  const [about, setAbout] = useState(false);
  const [aboutErr, setAboutErr] = useState("");
  const [social, setSocial] = useState(false);
  const [socialErr, setSocailErr] = useState("");
  const [required, setRequired] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userId = localStorage.getItem("userId");

    let obj = {
      name: data.get("name"),
      username: data.get("username"),
      about: data.get("about"),
      social: data.get("social"),
      userId: userId,
    };

    const { name, username, about, social } = obj;
    if (name && username && about && social) {
      let regName = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
      let regUrl = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      setRequired("");
      if (regName.test(name.toString())) {
        setName(false);
        setNameErr("");
        if (username.length >= 3) {
          setUserName(false);
          setUserNameErr("");
          if (about.length >= 10) {
            setAbout(false);
            setAboutErr("");
            if (regUrl.test(social.toString())) {
              setSocial(false);
              setSocailErr("");

              const response = await userSignupData(obj);
              console.log("here", response);

              if (response.message == "success") {
                toast.success(response.message, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
                setTimeout(() => {
                  router.push("/activate");
                }, 1200);
              } else {
                toast.error(response.message, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }
            } else {
              setSocial(true);
              setSocailErr("Please,enter a valid link");
            }
          } else {
            setAbout(true);
            setAboutErr("About should be contain at least 10 character");
          }
        } else {
          setUserName(true);
          setUserNameErr("username must be need more than 3 characters");
        }
      } else {
        setName(true);
        setNameErr("Name should only have no special characters");
      }
    } else {
      setRequired("All feilds are required");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "600" }}>
            Complete your page
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  error={name}
                  helperText={nameErr}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#4f4e4e" }, //styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": { borderColor: "#f22c50" },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderRadius: 3 },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Your page username"
                  name="username"
                  autoComplete="username"
                  error={userName}
                  helperText={userNameErr}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#4f4e4e" }, //styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": { borderColor: "#f22c50" },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderRadius: 3 },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="about"
                  label="About"
                  type="text"
                  id="about"
                  autoComplete="about"
                  placeholder="Hey 👋 I just created a page here. Make a day for me !"
                  multiline
                  rows={3}
                  error={about}
                  helperText={aboutErr}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#4f4e4e" },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": { borderColor: "#f22c50" },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderRadius: 3 },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="social"
                  label="Website or social link"
                  placeholder="https://"
                  name="social"
                  autoComplete="social"
                  error={social}
                  helperText={socialErr}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#4f4e4e" }, //styles the label
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": { borderColor: "#f22c50" },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderRadius: 3 },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 5,
                mb: 2,
                borderRadius: "20px",
                height: "42px",
                backgroundColor: "#eb1e44",
                "&:hover": { backgroundColor: "#eb1e44" },
                textTransform: "none",
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
