exports.generateShowTimeForDays = () => {
  try {
    const currentDay = new Date();
    const nextSevenDays = new Date();
    nextSevenDays.setDate(currentDay.getDate() + 7);
    const showTimes = [];

    while (currentDay <= nextSevenDays) {
      console.log(currentDay, nextSevenDays);
      currentDay.setDate(currentDay.getDate() + 1);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.checkInRangeWeek = (value) => {
  const currentDay = new Date();
  const nextSevenDays = new Date();

  let day = currentDay.getDate();
  let month = currentDay.getMonth() + 1;
  let year = currentDay.getFullYear();

  let currentDate = `${year}-${month > 9 ? `1${month}` : `0${month}`}-${day}`;
  const updatedValue = new Date(value);

  nextSevenDays.setDate(currentDay.getDate() + 7);
  if (currentDate == value || updatedValue <= nextSevenDays) {
    return true;
  } else {
    return false;
  }
};
