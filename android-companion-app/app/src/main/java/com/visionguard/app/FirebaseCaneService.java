package com.visionguard.app;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/**
 * Real-time Firebase RTDB SSE Client & REST Logger
 * Streams /cane node events via Server-Sent Events (SSE).
 */
public class FirebaseCaneService {
    private static final String TAG = "FirebaseCaneService";
    public static final String DATABASE_BASE_URL = "https://iotonoffidc-default-rtdb.firebaseio.com";
    private static final String CANE_SSE_URL = DATABASE_BASE_URL + "/cane.json";

    public interface CaneDataListener {
        void onCaneData(CaneData data);
    }

    public static class CaneData {
        public double frontCm = 0.0;
        public double downCm = 0.0;
        public double tiltZ = 0.0;
        public double tiltDelta = 0.0;
        public String status = "PATH_CLEAR";
        public String alertText = "Path is clear ahead";
        public boolean sos = false;
        public boolean fall = false;
        public boolean muted = false;

        public static CaneData parse(JSONObject json) {
            CaneData d = new CaneData();
            if (json == null) return d;
            d.frontCm = json.optDouble("front_cm", 0.0);
            d.downCm = json.optDouble("down_cm", 0.0);
            d.tiltZ = json.optDouble("tilt_z", 0.0);
            d.tiltDelta = json.optDouble("tilt_delta", 0.0);
            d.status = json.optString("status", "PATH_CLEAR");
            d.alertText = json.optString("alert_text", "Path is clear ahead");
            d.sos = json.optBoolean("sos", false);
            d.fall = json.optBoolean("fall", false);
            d.muted = json.optBoolean("muted", false);
            return d;
        }
    }

    private static Thread listenerThread;
    private static volatile boolean isRunning = false;
    private static final Handler mainHandler = new Handler(Looper.getMainLooper());

    public static synchronized void startListening(CaneDataListener listener) {
        if (isRunning) return;
        isRunning = true;

        listenerThread = new Thread(() -> {
            while (isRunning) {
                HttpURLConnection conn = null;
                BufferedReader reader = null;
                try {
                    URL url = new URL(CANE_SSE_URL);
                    conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");
                    conn.setRequestProperty("Accept", "text/event-stream");
                    conn.setReadTimeout(0); // keep-alive stream
                    conn.setConnectTimeout(10000);

                    reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
                    String line;
                    while (isRunning && (line = reader.readLine()) != null) {
                        if (line.startsWith("data:")) {
                            String data = line.substring(5).trim();
                            if (!data.equals("null") && !data.isEmpty()) {
                                try {
                                    JSONObject root = new JSONObject(data);
                                    // Firebase SSE can send {"path":"/","data":{...}} or direct object
                                    JSONObject payload = root.has("data") && root.get("data") instanceof JSONObject
                                            ? root.getJSONObject("data")
                                            : root;
                                    
                                    final CaneData caneData = CaneData.parse(payload);
                                    mainHandler.post(() -> listener.onCaneData(caneData));
                                } catch (Exception parseEx) {
                                    Log.e(TAG, "Error parsing cane JSON: " + parseEx.getMessage());
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    Log.e(TAG, "SSE connection error, reconnecting in 3s: " + e.getMessage());
                    try {
                        Thread.sleep(3000);
                    } catch (InterruptedException ignored) {}
                } finally {
                    try {
                        if (reader != null) reader.close();
                        if (conn != null) conn.disconnect();
                    } catch (Exception ignored) {}
                }
            }
        });
        listenerThread.start();
    }

    public static synchronized void stopListening() {
        isRunning = false;
        if (listenerThread != null) {
            listenerThread.interrupt();
            listenerThread = null;
        }
    }

    public static void clearAlertInFirebase() {
        new Thread(() -> {
            try {
                String endpoint = DATABASE_BASE_URL + "/cane.json";
                JSONObject update = new JSONObject();
                update.put("sos", false);
                update.put("fall", false);
                update.put("status", "PATH_CLEAR");
                update.put("alert_text", "Path is clear ahead (Acknowledged)");

                URL url = new URL(endpoint);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("PATCH");
                conn.setRequestProperty("Content-Type", "application/json; utf-8");
                conn.setDoOutput(true);

                try (OutputStream os = conn.getOutputStream()) {
                    byte[] input = update.toString().getBytes(StandardCharsets.UTF_8);
                    os.write(input, 0, input.length);
                }
                conn.getResponseCode();
                conn.disconnect();
            } catch (Exception e) {
                Log.e(TAG, "Failed to clear alert in Firebase: " + e.getMessage());
            }
        }).start();
    }
}
