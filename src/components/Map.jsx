import React, { useState, useEffect } from "react";

const Map = (route) => {
  const MapRender = () => {
    const [rendered, setRendered] = useState(false);
    useEffect(() => {
      if (rendered) {
        /*eslint-disable */
        ymaps.ready(init);
        function init() {
          // Creating the map.
          var myMap = new ymaps.Map("map", {
            // The map center coordinates.
            // Default order: “latitude, longitude”.
            // To not manually determine the map center coordinates,
            // use the Coordinate detection tool.
            center: [56.852946, 53.208719],
            // Zoom level. Acceptable values:
            // from 0 (the entire world) to 19.
            zoom: 14,
          });
          var multiRoute = new ymaps.multiRouter.MultiRoute(
            {
              referencePoints: route.route,
              params: {
                // Тип маршрута: на общественном транспорте.
                routingMode: "pedestrian",
              },
            },
            {
              // Автоматически устанавливать границы карты так,
              // чтобы маршрут был виден целиком.
              boundsAutoApply: true,
            }
          );

          myMap.geoObjects.add(multiRoute);
        }

        /*eslint-enable */
      }

      if (!rendered) {
        setRendered(true);
      }
    });
    return (
      <div
        id="map"
        className="mt-2 h-48 sm:h-[600px]"
         style={{ width: "100%" }}
      ></div>
    );
  };

  return (
    <>
      <MapRender />
    </>
  );
};

export default Map;
