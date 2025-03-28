import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useSelector } from "react-redux";
import useBlogCall from "../../hooks/useBlogCall";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MyBlogList() {
  const { getAllBlogs, deleteBlog } = useBlogCall();
  const { blogs } = useSelector((state) => state.blogs);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getAllBlogs();
  }, []);

  const filteredBlogsByTherapist = blogs?.filter(
    (blog) => blog?.therapistId?._id === currentUser?._id
  );

  const filteredBlogsByUserLike = blogs?.filter((blog) =>
    blog?.likes.includes(currentUser._id)
  );

  let filteredBlogs;

  if (!currentUser?.isTherapist) {
    filteredBlogs = filteredBlogsByUserLike;
  } else {
    filteredBlogs = filteredBlogsByTherapist;
  }

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
          {currentUser?.isTherapist ? t("myBlogs") : t("likedBlogs")}
        </Typography>
      </Box>
      {filteredBlogs?.length > 0 ? (
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
          {filteredBlogs.map((item) => (
            <ImageListItem
              key={item?.title || item?._id}
              sx={{
                width: "100%",
                height: "100%",
                "&:hover": {
                  padding: "2px",
                  transition: "all 0.1s ease-in-out",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/blogs/${item?._id}`)}
            >
              <img
                src={item?.image || "/placeholder.svg"}
                alt={item?.title}
                loading="lazy"
              />
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
                    {item?.title}
                  </Typography>
                }
                subtitle={
                  item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("de-DE")
                    : ""
                }
                actionIcon={
                  currentUser?.isTherapist ? (
                    <div className="flex">
                      <IconButton
                        sx={{
                          color: "customColors.darkgreen",
                          "&:hover": {
                            color: "customColors.lightgreen",
                            transform: "scale(1.1)",
                          },
                          position: "relative",
                          zIndex: 10,
                        }}
                        aria-label={`edit ${item?.title}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/profile/write-blog/${item?._id}`);
                        }}
                      >
                        <EditNoteRoundedIcon />
                      </IconButton>
                      <IconButton
                        sx={{
                          color: "customColors.darkgreen",
                          fontSize: "1.2rem",
                          "&:hover": {
                            color: "customColors.lightgreen",
                            transform: "scale(1.05)",
                          },
                          position: "relative",
                          zIndex: 10,
                        }}
                        aria-label={`delete ${item?.title}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteBlog(item?._id);
                        }}
                      >
                        <DeleteRoundedIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  ) : null
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <p className="p-10 text-center text-navy dark:text-offWhite">
          {t("noBlog")}
        </p>
      )}
    </Container>
  );
}
