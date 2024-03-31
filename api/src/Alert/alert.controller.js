import AlertService from "./alert.service.js";

// Create alert
export const createAlert = async (req, res, next) => {
  const { deviceId, dateTime } = req.body;
  const alert = await AlertService.createAlert(deviceId, dateTime);
  return res.send(alert);
};

// Get alerts
export const getAlerts = async (req, res, next) => {
  const response = await AlertService.getAlerts();
  return res.send({ alerts: response });
};
