import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, fetchRemoveReview } from "../redux/slices/review.js";
import Avatar from "@mui/material/Avatar";
import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "./../axios";

const Reviews = () => {
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviews);
  const isReviewsLoading = reviews.status === "loading";
  React.useEffect(() => {
    dispatch(fetchReviews());
  }, []);
  const onClickRemove = (obj) => {
    dispatch(fetchRemoveReview(obj._id));
  };

  return (
    <>
      {(isReviewsLoading ? [...Array()] : reviews.items).map((obj, index) =>
        isReviewsLoading ? (
          <div></div>
        ) : (
          <>
            <div className="flex justify-center ">
              <div className="max-w-3xl ">
                <div className="block p-6 rounded-lg bg-white shadow-lg bg-blend-multiply hover:bg-[#3b83f610] duration-600  m-4 duration-500  hover:hover:shadow-[rgb(59,130,246,0.5)] hover:shadow-lg">
                  <div className="md:flex md:flex-row items-center">
                    <div className="md:w-96 w-36 flex justify-center items-center mb-6 lg:mb-0 mx-auto md:mx-0">
                      {/* <img
                          src={review.avatarUrl}
                          className="rounded-full shadow-md"
                     
                        /> */}
                      {obj.user.avatarUrl ? (
                        <Avatar
                          alt="Remy Sharp"
                          src={obj.user.avatarUrl}
                          sx={{
                            width: "230px",
                            height: "230px",
                          }}
                        />
                      ) : (
                        <Avatar
                          aria-label="recipe"
                          sx={{
                            width: "230px",
                            height: "230px",
                          }}
                        ></Avatar>
                      )}
                    </div>
                    <div className="md:ml-6">
                      <h1 className="text-gray-600 font-normal mb-4 text-2xl w-fit">
                        {obj.dataForReview[0]}
                      </h1>
                      <p className="text-gray-500 font-light mb-6 w-[65%]">
                        {obj.textReview}
                      </p>

                      <p className="font-semibold text-xl mb-2 text-[rgb(59,130,246);]">
                        {obj.user.username}
                      </p>

                      <p className="font-semibold text-gray-500 mb-0">
                        Автор маршрута: {obj.dataForReview[1]}
                      </p>

                      <NavLink
                        to={`/route/${obj.dataForReview[2]}`}
                        className="font-light text-gray-500 rounded right-0 sm:absolute sm:px-2 duration-500 hover:text-slate-600 hover:bg-slate-200"
                      >
                        Посмотреть
                      </NavLink>
                    </div>
                    {userData?.username === obj.user.username ? (
                      <IconButton
                        color="primary"
                        sx={{ "&:hover": { color: "green" } }}
                      >
                        <DeleteForever
                          onClick={() => {
                            onClickRemove(obj);
                          }}
                        />
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default Reviews;
