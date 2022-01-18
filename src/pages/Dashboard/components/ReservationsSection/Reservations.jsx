import React, { useContext } from "react";
import "./reservations.scss";
import { ReactComponent as DeviceIcon } from "../../../../assets/svg/deviceIcon.svg";
import { ReactComponent as BookIcon } from "../../../../assets/svg/bookIcon.svg";
import { ReactComponent as DoorIcon } from "../../../../assets/svg/doorIcon.svg";
import { ReservationsCard } from "./Components/ReservationsCard";
import { UserContext } from "features/UserContext";

export const Reservations = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className="reservation__container">
      <h2 className="reservation__heading">Reservations</h2>
      {userData.reservations && (
        <div className="reservation__grid-container">
          <ReservationsCard
            title="Meeting rooms"
            reserved={userData.reservations.rooms.length}
            icon={<DoorIcon />}
          ></ReservationsCard>
          <ReservationsCard
            title="Books"
            reserved={userData.reservations.books.length}
            icon={<BookIcon />}
          ></ReservationsCard>
          <ReservationsCard
            title="Devices"
            reserved={userData.reservations.devices.length}
            icon={<DeviceIcon />}
          ></ReservationsCard>
        </div>
      )}
    </div>
  );
};
