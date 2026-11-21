package com.visionguard.app;

import android.util.Log;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * Lightweight Firebase Realtime Database Client
 * Connected to: https://iotonoffidc-default-rtdb.firebaseio.com
 */
public class FirebaseLogger {
    private static final String TAG = "FirebaseLogger";
    
    // Connected Firebase Realtime Database URL
    private static final String DATABASE_URL = "https://iotonoffidc-default-rtdb.firebaseio.com";

    public static void logLocation(double lat, double lng, String status, String extraInfo) {
        new Thread(() -> {
            try {
                String endpoint = DATABASE_URL + "/tracking.json";
                long timestamp = System.currentTimeMillis();
                
                String jsonPayload = String.format(
                    "{\"timestamp\":%d,\"lat\":%.6f,\"lng\":%.6f,\"status\":\"%s\",\"extra\":\"%s\"}",
                    timestamp, lat, lng, status, extraInfo
                );

                URL url = new URL(endpoint);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json; utf-8");
                conn.setDoOutput(true);
                conn.setConnectTimeout(6000);
                conn.setReadTimeout(6000);

                try (OutputStream os = conn.getOutputStream()) {
                    byte[] input = jsonPayload.getBytes(StandardCharsets.UTF_8);
                    os.write(input, 0, input.length);
                }

                int responseCode = conn.getResponseCode();
                Log.d(TAG, "Firebase logged successfully. Response: " + responseCode);
                conn.disconnect();
            } catch (Exception e) {
                Log.e(TAG, "Failed to log to Firebase: " + e.getMessage());
            }
        }).start();
    }
}
