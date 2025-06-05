import { utcToZonedTime, format } from "date-fns-tz";
import { CarSize } from "../../state/apis/volunteerApi/driver";

export const formatDate = (date: string) =>
  format(utcToZonedTime(date, "America/Los_Angeles"), "eee, M/d/yy");

export const formatTime = (date: string) =>
  format(utcToZonedTime(date, "America/Los_Angeles"), "h:mm aaa");

const carSizes: CarSize[] = ["Bike", "Small", "Medium", "Large"];

export const isCarBigEnough = ({
  requirement,
  userCar,
}: {
  requirement?: CarSize;
  userCar?: CarSize;
}) => {
  if (!requirement || !userCar) {
    return false;
  }
  const shiftSize = carSizes.findIndex((size) => size === requirement);
  const userCarSize = carSizes.findIndex((size) => size === userCar);
  return userCarSize >= shiftSize;
};
