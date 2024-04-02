from config_manager import ConfigManager
import requests

config_manager = ConfigManager()

while True:
    response = requests.get("http://localhost:3000/cameraConfig")
    print(response)
    break
    # Sleep for 15 minutes
    time.sleep(900)