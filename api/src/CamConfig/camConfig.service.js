import fs from "fs/promises";

// Path to the JSON file
const cameraConfigPath =
  process.env.CONFIG_PATH ??
  "C:\\Personal\\Study\\Alert-backend\\config\\config.json";

export default {
  addCameraConfig: async (deviceId, deviceName, ip) => {
    try {
      let oldConfig = await fs.readFile(cameraConfigPath, "utf-8");
      let jsonCamConfig = JSON.parse(oldConfig);

      jsonCamConfig?.cameraConfig?.push({
        deviceId: deviceId,
        deviceName: deviceName,
        ip: ip,
        createdAt: new Date(),
      });
      console.log({ jsonCamConfig });
      await fs.writeFile(
        cameraConfigPath,
        JSON.stringify(jsonCamConfig, null, 4),
        "utf-8"
      );
      return { status: "success", message: "Sucessfully updated cameraConfig" };
    } catch (err) {
      console.log(err);
      return { status: "failure", message: "Error in updating cameraConfig" };
    }
  },
  getCameraConfig: async () => {
    try {
      let oldConfig = await fs.readFile(cameraConfigPath, "utf-8");
      let jsonCamConfig = JSON.parse(oldConfig);
      return jsonCamConfig;
    } catch (err) {
      console.log(err);
      return { status: "failure", message: "Error in updating cameraConfig" };
    }
  },
};
