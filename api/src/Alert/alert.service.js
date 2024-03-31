import { createAlert, getAlerts } from "./alert.db.js";

export default {
  createAlert: async (deviceId, dateTime) => {
    const newAlert = await createAlert(deviceId, dateTime);
    return newAlert;
  },
  getAlerts: async () => {
    const response = await getAlerts();
    return response;
  },
};
