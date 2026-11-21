package com.visionguard.app;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.speech.tts.TextToSpeech;
import android.telephony.SmsManager;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import java.util.Locale;

public class MainActivity extends Activity implements TextToSpeech.OnInitListener {
    private static final int PERMISSION_REQ_CODE = 101;

    // Default Emergency Contact (can be changed or made configurable)
    private String emergencyPhone = "+919876543210";

    private TextView tvStatus;
    private TextView tvLocation;
    private Button btnOneClickCall;
    private Button btnSos;

    private TextToSpeech tts;
    private Vibrator vibrator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tvStatus = findViewById(R.id.tvStatus);
        tvLocation = findViewById(R.id.tvLocation);
        btnOneClickCall = findViewById(R.id.btnOneClickCall);
        btnSos = findViewById(R.id.btnSos);

        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        tts = new TextToSpeech(this, this);

        checkAndRequestPermissions();

        // 1-Click Call Guardian Button
        btnOneClickCall.setOnClickListener(v -> {
            vibrate(150);
            speak("Calling emergency contact now");
            makeEmergencyCall();
        });

        // Instant SOS Button
        btnSos.setOnClickListener(v -> {
            vibrate(500);
            speak("Emergency alert triggered. Dispatching SMS and location.");
            sendEmergencySos();
        });
    }

    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            tts.setLanguage(Locale.US);
            tts.speak("VisionGuard is active. Tap top for calling guardian, tap bottom for SOS.", TextToSpeech.QUEUE_FLUSH, null, "WELCOME");
        }
    }

    private void makeEmergencyCall() {
        try {
            Intent callIntent = new Intent(Intent.ACTION_CALL);
            callIntent.setData(Uri.parse("tel:" + emergencyPhone));
            startActivity(callIntent);
        } catch (SecurityException e) {
            // Fallback to dialer if direct call permission not yet granted
            Intent dialIntent = new Intent(Intent.ACTION_DIAL);
            dialIntent.setData(Uri.parse("tel:" + emergencyPhone));
            startActivity(dialIntent);
        }
    }

    private void sendEmergencySos() {
        double lat = LocationTrackingService.currentLat;
        double lng = LocationTrackingService.currentLng;

        String mapLink = "https://maps.google.com/?q=" + lat + "," + lng;
        String message = "EMERGENCY SOS: Fall detected/Distress triggered. Location: " + mapLink;

        // 1. Send SMS directly
        try {
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(emergencyPhone, null, message, null, null);
            Toast.makeText(this, "Emergency SMS Sent!", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Toast.makeText(this, "SMS failed: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }

        // 2. Log incident to Firebase Realtime Database
        FirebaseLogger.logLocation(lat, lng, "EMERGENCY_SOS", "SOS button pressed by user");

        tvLocation.setText("SOS Sent!\nLat: " + lat + ", Lng: " + lng);
    }

    private void vibrate(long ms) {
        if (vibrator != null && vibrator.hasVibrator()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createOneShot(ms, VibrationEffect.DEFAULT_AMPLITUDE));
            } else {
                vibrator.vibrate(ms);
            }
        }
    }

    private void speak(String text) {
        if (tts != null) {
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "TTS_ALERT");
        }
    }

    private void checkAndRequestPermissions() {
        String[] permissions = {
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.CALL_PHONE,
            Manifest.permission.SEND_SMS
        };

        boolean allGranted = true;
        for (String perm : permissions) {
            if (checkSelfPermission(perm) != PackageManager.PERMISSION_GRANTED) {
                allGranted = false;
                break;
            }
        }

        if (!allGranted) {
            requestPermissions(permissions, PERMISSION_REQ_CODE);
        } else {
            startTrackingService();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQ_CODE) {
            startTrackingService();
        }
    }

    private void startTrackingService() {
        Intent serviceIntent = new Intent(this, LocationTrackingService.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(serviceIntent);
        } else {
            startService(serviceIntent);
        }
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }
}
