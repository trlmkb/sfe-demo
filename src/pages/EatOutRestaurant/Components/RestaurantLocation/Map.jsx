import React, { useState, useRef, useEffect } from "react";
import { PropTypes } from "prop-types";
import "./RestaurantLocation.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line

export const Map = ({ restaurant }) => {
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  mapboxgl.accessToken = mapboxAccessToken;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(restaurant.location.coordinates.lng);
  const [lat, setLat] = useState(restaurant.location.coordinates.lat);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: false,
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // Add marker to the map
    new mapboxgl.Marker({
      color: "#72ddf7",
    })
      .setLngLat([lng, lat])
      .addTo(map.current);
  }, []); // eslint-disable-line

  return <div ref={mapContainer} className="location__map-container" />;
};

Map.propTypes = {
  restaurant: PropTypes.object,
};
