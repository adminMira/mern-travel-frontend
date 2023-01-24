import React from "react";
import RouteCard from "../components/RouteCard.jsx";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutes } from "../redux/slices/route.js";
const AllRoutes = () => {
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const { routes } = useSelector((state) => state.routes);
  const isRoutesLoading = routes.status === "loading";
  React.useEffect(() => {
    dispatch(fetchRoutes());
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-8">
      {(isRoutesLoading ? [...Array()] : routes.items).map((obj, index) =>
        isRoutesLoading ? (
          <div style="padding-top:100.000%;position:relative;"><iframe src="https://gifer.com/embed/VAyR" width="100%" height="100%" style='position:absolute;top:0;left:0;' frameBorder="0" allowFullScreen></iframe></div><p><a href="https://gifer.com">через GIFER</a></p>
        ) : (
          <RouteCard
            id={obj._id}
            title={obj.title}
            description={obj.description}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
            commentsCount={3}
            user={obj.user}
            logo={obj.logo}
          />
        )
      )}
    </div>
  );
};

export default AllRoutes;
