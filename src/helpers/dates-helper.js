import moment from "moment";

export const isValidDate = (dateString) => moment(dateString).isValid();

export const validateSlots = ({ slotStart, slotEnd }) => {
  const mSlotStartDate = moment(new Date(slotStart));
  const mSlotEndDate = moment(new Date(slotEnd));
  return mSlotStartDate.isBefore(mSlotEndDate);
};

export const getFormattedDate = (dateString) =>
  moment(new Date(dateString)).toDate();
