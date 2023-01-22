import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import TextField from "@mui/material/TextField";
import { ReactSortable } from "react-sortablejs";
import DeleteIcon from "@mui/icons-material/Delete";
import ListSubheader from "@mui/material/ListSubheader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Map from "../components/Map";
import axios from "../axios";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import { Navigate, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function App() {
  const items = [
    {
      title: "места культуры",
      places: [
        {
          title: "Русский драматический театр",
          description:
            "Здание русского драматического театра (бывшее здание Дворца культуры «Машиностроитель») яркий пример развития советской архитектуры конструктивизма к архитектуре 50-х годов.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16378_1.jpg",
          coordinates: [56.84127582532452, 53.205406197923615],
        },
        {
          title: "Государственный национальный театр Удмуртской Республики",
          description:
            "Предшественником Государственного национального театра был Центральный удмуртский клуб «Красный удмурт», возникший в 1923 году. При нём действовал драматический кружок, давший начало самодеятельному театру, на базе которого 7 февраля 1931 года был создан первый профессиональный удмуртский театр.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16379_1.jpg",
          coordinates: [56.87176889746844, 53.24509912866931],
        },
        {
          title: "Государственный цирк Удмуртской Республики",
          description:
            "Первый в Ижевске цирк открылся в 1895 году на Базарной площади возле мучного базара (пересечение улиц Горького и Бородина на месте старого корпуса механического института). Постоянно действующее деревянное здание было построено на средства предпринимателя А. Г. Коромыслова. В цирке гастролировали артисты из Вены, Парижа, Берлина, проводились чемпионаты борцов. Цирк сгорел во время Гражданской войны.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16377_1.jpg",
          coordinates: [56.84133, 53.210987],
        },
        {
          title: "Государственный театр кукол Удмуртской Республики",
          description:
            "Современное здание государственного театра кукол построено в 1980 году, однако история театра кукол в Ижевске началась намного раньше - в 1935 году. Его организаторами стали С. Ломовская и М. Точилина (Стрелкова), окончившие специальные курсы кукловодов при Центральном театре кукол под руководством С.Образцова.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16374_1.jpg",
          coordinates: [56.848675, 53.222782],
        },
      ],
    },
    {
      title: "места памятникки",
      places: [
        {
          title: "Русскываываываыа театр",
          description:
            "Здание русского драматического театра (бывшее здание Дворца культуры «Машиностроитель») яркий пример развития советской архитектуры конструктивизма к архитектуре 50-х годов.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16378_1.jpg",
          coordinates: [56.84127582532452, 53.205406197923615],
        },
        {
          title: "Государываываываываный нациоублики",
          description:
            "Предшественником Государственного национального театра был Центральный удмуртский клуб «Красный удмурт», возникший в 1923 году. При нём действовал драматический кружок, давший начало самодеятельному театру, на базе которого 7 февраля 1931 года был создан первый профессиональный удмуртский театр.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16379_1.jpg",
          coordinates: [56.87176889746844, 53.24509912866931],
        },
        {
          title: "Государственываываыванлики",
          description:
            "Первый в Ижевске цирк открылся в 1895 году на Базарной площади возле мучного базара (пересечение улиц Горького и Бородина на месте старого корпуса механического института). Постоянно действующее деревянное здание было построено на средства предпринимателя А. Г. Коромыслова. В цирке гастролировали артисты из Вены, Парижа, Берлина, проводились чемпионаты борцов. Цирк сгорел во время Гражданской войны.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16377_1.jpg",
          coordinates: [56.84133, 53.210987],
        },
        {
          title: "Государственываываывавыаыный теаики",
          description:
            "Современное здание государственного театра кукол построено в 1980 году, однако история театра кукол в Ижевске началась намного раньше - в 1935 году. Его организаторами стали С. Ломовская и М. Точилина (Стрелкова), окончившие специальные курсы кукловодов при Центральном театре кукол под руководством С.Образцова.",
          imgSrc: "https://www.izh.ru/res_ru/0_image_16374_1.jpg",
          coordinates: [56.848675, 53.222782],
        },
      ],
    },
  ];
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState();
  const [logo, setLogo] = useState();
  const [description, setDescription] = useState();
  const [list, setlist] = useState([]);
  const [route, setRoute] = useState([]);
  const handleSubmitPlace = (place) => {
    setlist([...list, place]);
    setRoute([...route, place.coordinates]);
  };
  const handleChange = useEffect(() => {
    list.map((e, i) => {
      route[i] = e.coordinates;
    });
  });
  const removePlace = (index) => {
    const reducedArr = [...list];
    reducedArr.splice(index, 1);
    setlist(reducedArr);

    const reducedRoute = [...route];
    reducedRoute.splice(index, 1);
    setRoute(reducedRoute);
  };
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to="/" />;
  }
  const onSubmit = async () => {
    try {
      const fields = {
        title,
        description,
        list,
        route,
        logo,
      };
      await axios.post("/", fields);
      navigate(`/`);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при создании опроса");
    }
  };
  return (
    <>
      <div className="px-10 pt-5 min-h-full flex flex-col">
        <div className="grow">
          <div className="flex flex-col sm:flex-row items-center ">
            <div className="w-full flex flex-col sm:w-1/3 ">
              <TextField
                id="filled-basic"
                label="Название"
                variant="filled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                multiline
                id="filled-basic"
                label="Описание"
                variant="filled"
                sx={{
                  mt: 4,
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {logo ? (
              <img
                onClick={() => setOpen(true)}
                src={logo}
                alt=""
                className="w-[200px] h-[200px] ml-4 cursor-pointer rounded-3xl duration-300 hover:bg-[rgb(220,220,220,0.2)]"
              />
            ) : (
              <svg
                onClick={() => setOpen(true)}
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:ml-4 cursor-pointer rounded-3xl duration-300 hover:bg-[rgb(220,220,220,0.2)]"
              >
                <path
                  d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                  stroke="#3A3A3A"
                  stroke-width="0.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
                  stroke="#3A3A3A"
                  stroke-width="0.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.75 5H21.25"
                  stroke="#3A3A3A"
                  stroke-width="0.5"
                  stroke-linecap="round"
                />
                <path
                  d="M18.5 7.75V2.25"
                  stroke="#3A3A3A"
                  stroke-width="0.5"
                  stroke-linecap="round"
                />
                <path
                  d="M2.66992 18.95L7.59992 15.64C8.38992 15.11 9.52992 15.17 10.2399 15.78L10.5699 16.07C11.3499 16.74 12.6099 16.74 13.3899 16.07L17.5499 12.5C18.3299 11.83 19.5899 11.83 20.3699 12.5L21.9999 13.9"
                  stroke="#3A3A3A"
                  stroke-width="0.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </div>
          {list.length ? (
            <Carousel
              navButtonsAlwaysVisible
              autoPlay={false}
              swipe={true}
              className="hidden sm:block"
            >
              {list.map((item, i) => (
                <div
                  key={i}
                  item={item}
                  className="h-96 sm:flex block items-center justify-around"
                >
                  <img
                    src={item.imgSrc}
                    alt=""
                    className="sm:w-1/3 w-full sm:h-4/5 h-2/3"
                  />
                  <div className="sm:w-1/2  w-full h-4/5 ">
                    <h1>{item.title}</h1>
                    <TextField
                      id="filled-basic"
                      label="Описание"
                      variant="standard"
                      sx={{ mt: 6 }}
                      multiline
                      className="w-full h-[90%] overflow-y-auto"
                      defaultValue={item.description}
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          ) : null}

          <div className="block w-full justify-between sm:flex">
            <FormControl variant="filled" className="w-full sm:w-1/4">
              <InputLabel htmlFor="grouped-select">Выберите место</InputLabel>
              <Select defaultValue="" id="grouped-select" label="Grouping">
                {items.map((item) => (
                  <>
                    <ListSubheader>{item.title}</ListSubheader>
                    {item.places.map((place) => (
                      <MenuItem
                        value={1}
                        onClick={() => {
                          handleSubmitPlace(place);
                        }}
                      >
                        {place.title}
                      </MenuItem>
                    ))}
                  </>
                ))}
              </Select>
            </FormControl>
            <ReactSortable
              group="groupName"
              animation={200}
              delayOnTouchStart={true}
              delay={2}
              list={list}
              setList={setlist}
              onChange={(event) => handleChange(event.target.value)}
              className="flex flex-col w-full sm:w-1/2"
            >
              {list.map((item, index) => (
                <Button variant="outlined" key={item.index}>
                  {item.title}
                  <DeleteIcon
                    className="cursor-pointer hover:text-[red] right-0 absolute"
                    onClick={() => {
                      removePlace(index);
                    }}
                  />
                </Button>
              ))}
            </ReactSortable>
          </div>
          <Map route={route} />
        </div>
        <Button
          variant="outlined"
          className="w-full shrink-0"
          onClick={onSubmit}
        >
          Опубликовать
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
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
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
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            id="standard-basic"
            label="Логотип"
            variant="standard"
            sx={{ mt: 4 }}
          />
        </Sheet>
      </Modal>
    </>
  );
}

export default App;
