import CamConfigService from "./camConfig.service.js";

// Add camera Config
export const addCameraConfig = async (req, res, next) => {
  const { deviceId, deviceName, ip } = req.body;
  const response = await CamConfigService.addCameraConfig(
    deviceId,
    deviceName,
    ip
  );
  return res.send(response);
};

// Get Camera config
export const getCameraConfig = async (req, res, next) => {
  const response = await CamConfigService.getCameraConfig();
  return res.send(response);
};
