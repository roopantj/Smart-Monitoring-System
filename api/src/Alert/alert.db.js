import Alert from "./alert.schema.js";

export const createAlert = async (
  deviceId,
  dateTime,
  { options = {} } = {}
) => {
  const alert = new Alert({
    deviceId,
    dateTime,
  });
  let response = await alert.save({ ...options });
  console.log(response);
  return response;
};

export const getAlerts = async ({
  conditions = {},
  projection = {},
  options = {},
} = {}) => {
  const response = await Alert.find(
    { ...conditions },
    { ...projection },
    { ...options }
  );
  return response;
};
