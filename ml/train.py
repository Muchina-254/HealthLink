# train.py
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib, os

# Generate simple fake health data
X = []
y = []
np.random.seed(1)
for i in range(1000):
    temp = np.clip(np.random.normal(37, 1.2), 35, 41)  # temperature
    rr = int(np.clip(np.random.normal(30, 8), 10, 70)) # respiratory rate

    # Assign labels: 0=Green, 1=Yellow, 2=Red
    if temp >= 39 or rr > 50:
        label = 2   # serious
    elif rr > 40:
        label = 1   # moderate
    else:
        label = 0   # normal
    X.append([temp, rr])
    y.append(label)

# Train the Random Forest model
model = RandomForestClassifier(n_estimators=80, random_state=42)
model.fit(X, y)

# Save the trained model file
os.makedirs("../backend/models", exist_ok=True)
joblib.dump(model, "../backend/models/model_rf.pkl")

print("✅ Model trained and saved to backend/models/model_rf.pkl")
