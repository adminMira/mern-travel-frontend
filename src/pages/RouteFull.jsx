import { React, useState, useEffect } from "react";
import Map from "../components/Map";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import { Navigate, useNavigate } from "react-router-dom";
import ModalClose from "@mui/joy/ModalClose";
import axios from "./../axios";
const RouteFull = () => {
  const [route, setRoute] = useState();
  const [open, setOpen] = useState(false);
  const [textReview, setTextReview] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`route/${id}`)
      .then((res) => {
        setRoute(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении маршрута");
      });
  }, []);
  const dataForReview = [route?.title, route?.user?.username, id];
  const onSubmit = async () => {
    try {
      const fields = {
        textReview,
        dataForReview,
      };
      await axios.post("/reviews", fields);
      Navigate(`/reviews`);
    } catch (error) {
      console.warn(error);
    }
    setOpen(false);
  };
  /*eslint-disable */
  useEffect(() => {
    document.getElementById("vk_share_button").innerHTML = VK.Share.button(
      {
        url: `http://localhost:3000/route/${id}`,
      },
      {
        type: "custom",
        text: "<img src=https://vk.com/images/share_32_2x.png width=36 height=36 alt=`share icon`/>",
      }
    );
  });
  /*eslint-enable */
  return (
    <div>
      <Carousel autoPlay={false} swipe={false}>
        {route?.list?.map((item, i) => (
          <div
            key={i}
            item={item}
            className="h-96 flex sm:flex-row flex-col items-center justify-around p-2 sm:p-0"
          >
            <img src={item.imgSrc} alt="" className="sm:w-1/3 sm:h-4/5 h-1/3" />
            <div className="sm:w-1/2 h-4/5">
              <h1>{item.title}</h1>
              <p className="mt-6 font-light h-4/5 overflow-y-auto">{item.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
      <Map route={route?.route} />
      <div className="w-full flex items-center">
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button onClick={() => setOpen(true)} className="w-full">
          Оставить отзыв
        </Button>
        <Button>
          <div id="vk_share_button" className="flex items-center"></div>
        </Button>
      </div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: "98%",
            height: "98%",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            bgcolor: "white",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />
          <TextField
            value={textReview}
            onChange={(e) => setTextReview(e.target.value)}
            label="Отзыв"
            multiline
            variant="standard"
            sx={{ mt: 4, height: "90%", width: "100%", overflowY: "auto" }}
          />

          <Button onClick={onSubmit}>Отправить</Button>
        </Sheet>
      </Modal>
    </div>
  );
};

export default RouteFull;
