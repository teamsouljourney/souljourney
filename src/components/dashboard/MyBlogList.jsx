import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { useSelector } from "react-redux";
import useBlogCall from "../../hooks/useBlogCall";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBlogList() {
  const { getAllBlogs } = useBlogCall();
  const { blogs } = useSelector((state) => state.blogs);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBlogs();
  }, []);

  const filteredBlogsByTherapist = blogs.filter(
    (blog) => blog.therapistId._id === currentUser._id
  );

  console.log(filteredBlogsByTherapist);
  return (
    <Container
      maxWidth="lg"
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "50%",
        },
        margin: "auto",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: 4,
          py: 1,
          textAlign: "center",
          borderRadius: "12px",
          mb: 3,
          bgcolor: "customColors.darkgreen",
        }}
      >
        <Typography
          variant="body"
          sx={{ color: "secondary.main", fontSize: "1.2rem" }}
        >
          {"My Blogs"}
        </Typography>
      </Box>
      <ImageList
        sx={{
          width: "100%",
          height: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(auto-fill, minmax(250px, 1fr))",
          },
          gap: 16,
        }}
      >
        {filteredBlogsByTherapist?.map((item) => (
          <ImageListItem
            key={item.title}
            sx={{
              width: "100%",
              height: "100%",
              "&:hover": {
                padding: "2px",
                transition: "all 0.1s ease-in-out",
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/blogs/${item._id}`)}
          >
            <img src={item.image} alt={item.title} loading="lazy" />
            <ImageListItemBar
              title={
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    wordBreak: "break-word",
                    display: "block",
                    whiteSpace: "normal",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </Typography>
              }
              subtitle={new Date(item.createdAt).toLocaleDateString("de-DE")}
              actionIcon={
                <IconButton
                  sx={{
                    color: "customColors.darkgreen",
                    "&:hover": {
                      color: "customColors.lightgreen",
                      transform: "scale(1.2)",
                    },
                    position: "relative",
                    zIndex: 10,
                  }}
                  aria-label={`info about ${item.therapistId.title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/profile/write-blog/${item._id}`);
                  }}
                >
                  <EditNoteRoundedIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}
