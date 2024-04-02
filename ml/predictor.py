import requests
import json
from datetime import datetime
import cv2
from tensorflow.keras.models import load_model

class Predictor:
    def __init__(self, device_id, ip):
        self.model = load_model("/home/subhash/Downloads/lrcn_model_v3.h5")
        self.device_id = device_id
        self.ip = ip # udp://192.168.0.117:20000
        self.predict()
    
    def current_datetime_string():
        now = datetime.now()
        date_time_string = now.strftime("%Y-%m-%d %H:%M:%S")
        return date_time_string

    def create_alert(self):
        alert_json = json.dumps({ "deviceId": self.device_id,"dateTime": self.current_datetime_string()})
        headers = {'Content-Type': 'application/json'}
        requests.post("http://localhost:3000/alert",data=alert_json,headers=headers)

    def predict(self):
        video_reader = cv2.VideoCapture(self.ip,cv2.CAP_FFMPEG)  # 0 represents the default camera
        predictionWindow = []
        fightCount = 0
        noFightCount = 0
        wait_interval = 0
        while True:
            frames = []
            for _ in range(30):  # Capture 30 frames for prediction
                success, frame = video_reader.read()
                if not success:
                    break

                # Resize and normalize the frame
                resized_frame = cv2.resize(frame, (64, 64)) / 255.0
                frames.append(resized_frame)

            if len(frames) < 30:
                print("Not enough frames for prediction.")
                break

            frames_sequence = np.array(frames)
            frames_sequence = np.expand_dims(frames_sequence, axis=0)  # Add batch dimension

            # Make predictions using the model
            predicted_label = np.argmax(model.predict(frames_sequence)[0])

            if predicted_label == 0:
                predictionWindow.append(0)
                noFightCount+=1
            else:
                predictionWindow.append(1)
                fightCount+=1
            wait_interval+=1
            
            # When 30 iterations are made, alert decision is made.
            if(fightCount+noFightCount==30):
                if(fightCount>20 and wait_interval>=5):
                    self.create_alert()
                    wait_interval=0        
                for i in predictionWindow[0:5]:
                    if i==1:
                        fightCount-=1
                    else:
                        noFightCount-=1
                predictionWindow=predictionWindow[5:]    

    