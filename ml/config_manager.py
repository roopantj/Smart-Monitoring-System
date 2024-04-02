import time
from predictor import Predictor

class ConfigManager:
    def __init__(self):
        self.camera_config = {}

    def update_config(self, new_camera_config):
        # Remove objects for elements missing in the new config
        for device_id in list(self.camera_config.keys()):
            if device_id not in new_camera_config:
                del self.camera_config[device_id]

        # Create objects for new or changed elements in the config
        for device_id, config_data in new_camera_config.items():
            if device_id not in self.camera_config or self.camera_config[device_id].ip != config_data[device_id].ip:
                self.camera_config[device_id] = Predictor(config_data)

# Example usage
config_manager = ConfigManager()

while True:
    # Fetch the config array every 15 minutes (900 seconds)
    config_array = {
        "element1": [1, 2, 3],
        "element2": [4, 5, 6],
        "element3": [7, 8, 9]
    }
    config_manager.update_config(config_array)

    # Sleep for 15 minutes
    time.sleep(900)
