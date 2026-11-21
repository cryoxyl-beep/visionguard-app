package com.visionguard.app;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.speech.tts.TextToSpeech;
import android.telephony.SmsManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends Activity implements TextToSpeech.OnInitListener {
    private static final String TAG = "MainActivity";
    private static final int PERMISSION_REQ_CODE = 101;
    private static final String PREF_NAME = "SmartCanePrefs";
    private static final String KEY_CONTACT = "emergency_contact";
    private static final long SMS_COOLDOWN_MS = 30000; // 30 seconds cooldown

    // UI Elements
    private TextView tvMutedBadge;
    private LinearLayout bannerStatusContainer;
    private TextView tvStatusCode;
    private TextView tvAlertText;

    private LinearLayout cardEmergencyAlert;
    private TextView tvEmergencyTitle;
    private TextView tvEmergencySubtitle;
    private Button btnClearAlert;

    private TextView tvFrontCm;
    private TextView tvDownCm;
    private TextView tvTiltDelta;
    private TextView tvTiltZ;

    private TextView tvGpsCoordinates;
    private TextView tvLastSmsStatus;

    private EditText etEmergencyContact;
    private Button btnSaveContact;
    private Button btnTestSms;
    private Button btnCallGuardian;

    // Services & Hardware
    private TextToSpeech tts;
    private Vibrator vibrator;
    private SharedPreferences prefs;

    private long lastSmsSentTime = 0;
    private String lastStatusHandled = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        prefs = getSharedPreferences(PREF_NAME, MODE_PRIVATE);
        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        tts = new TextToSpeech(this, this);

        bindViews();
        loadSavedContact();
        checkAndRequestPermissions();
        setupListeners();
        startFirebaseCaneListener();
    }

    private void bindViews() {
        tvMutedBadge = findViewById(R.id.tvMutedBadge);
        bannerStatusContainer = findViewById(R.id.bannerStatusContainer);
        tvStatusCode = findViewById(R.id.tvStatusCode);
        tvAlertText = findViewById(R.id.tvAlertText);

        cardEmergencyAlert = findViewById(R.id.cardEmergencyAlert);
        tvEmergencyTitle = findViewById(R.id.tvEmergencyTitle);
        tvEmergencySubtitle = findViewById(R.id.tvEmergencySubtitle);
        btnClearAlert = findViewById(R.id.btnClearAlert);

        tvFrontCm = findViewById(R.id.tvFrontCm);
        tvDownCm = findViewById(R.id.tvDownCm);
        tvTiltDelta = findViewById(R.id.tvTiltDelta);
        tvTiltZ = findViewById(R.id.tvTiltZ);

        tvGpsCoordinates = findViewById(R.id.tvGpsCoordinates);
        tvLastSmsStatus = findViewById(R.id.tvLastSmsStatus);

        etEmergencyContact = findViewById(R.id.etEmergencyContact);
        btnSaveContact = findViewById(R.id.btnSaveContact);
        btnTestSms = findViewById(R.id.btnTestSms);
        btnCallGuardian = findViewById(R.id.btnCallGuardian);
    }

    private void loadSavedContact() {
        String saved = prefs.getString(KEY_CONTACT, "");
        if (!saved.isEmpty()) {
            etEmergencyContact.setText(saved);
        }
    }

    private void setupListeners() {
        // Save emergency contact
        btnSaveContact.setOnClickListener(v -> {
            String contact = etEmergencyContact.getText().toString().trim();
            if (contact.isEmpty()) {
                Toast.makeText(this, "Please enter a phone number", Toast.LENGTH_SHORT).show();
                return;
            }
            prefs.edit().putString(KEY_CONTACT, contact).apply();
            vibrate(100);
            speak("Emergency contact saved");
            Toast.makeText(this, "Emergency contact saved: " + contact, Toast.LENGTH_SHORT).show();
        });

        // Test emergency SMS button
        btnTestSms.setOnClickListener(v -> {
            vibrate(250);
            sendEmergencySms("TEST_DEMO: Manual Test from Smart Cane App", true);
        });

        // Acknowledge / Clear alert
        btnClearAlert.setOnClickListener(v -> {
            vibrate(150);
            cardEmergencyAlert.setVisibility(View.GONE);
            speak("Emergency alert acknowledged and cleared");
            FirebaseCaneService.clearAlertInFirebase();
            Toast.makeText(this, "Alert cleared", Toast.LENGTH_SHORT).show();
        });

        // 1-Click Call Guardian
        btnCallGuardian.setOnClickListener(v -> {
            String contact = prefs.getString(KEY_CONTACT, etEmergencyContact.getText().toString().trim());
            if (contact.isEmpty()) {
                Toast.makeText(this, "Please save an emergency contact first", Toast.LENGTH_SHORT).show();
                speak("No emergency contact number saved");
                return;
            }
            vibrate(150);
            speak("Calling emergency contact");
            try {
                Intent callIntent = new Intent(Intent.ACTION_CALL);
                callIntent.setData(Uri.parse("tel:" + contact));
                startActivity(callIntent);
            } catch (SecurityException e) {
                Intent dialIntent = new Intent(Intent.ACTION_DIAL);
                dialIntent.setData(Uri.parse("tel:" + contact));
                startActivity(dialIntent);
            }
        });
    }

    private void startFirebaseCaneListener() {
        FirebaseCaneService.startListening(caneData -> {
            updateLiveUi(caneData);
            checkAndDispatchEmergency(caneData);
        });
    }

    private void updateLiveUi(FirebaseCaneService.CaneData data) {
        // 1. Muted badge
        tvMutedBadge.setVisibility(data.muted ? View.VISIBLE : View.GONE);

        // 2. Metrics Cards
        tvFrontCm.setText(String.format(Locale.US, "%.0f cm", data.frontCm));
        tvDownCm.setText(String.format(Locale.US, "%.0f cm", data.downCm));
        tvTiltDelta.setText(String.format(Locale.US, "%.1f", data.tiltDelta));
        tvTiltZ.setText(String.format(Locale.US, "Z: %.1f", data.tiltZ));

        // 3. Status text & Banner Color Code
        tvStatusCode.setText(data.status);
        tvAlertText.setText(data.alertText != null && !data.alertText.isEmpty() ? data.alertText : data.status);

        int bannerBgColor;
        boolean isEmergency = false;

        switch (data.status) {
            case "PATH_CLEAR":
                bannerBgColor = Color.parseColor("#1B5E20"); // Green
                break;
            case "OBSTACLE_FAR":
                bannerBgColor = Color.parseColor("#FF8F00"); // Amber
                break;
            case "OBSTACLE_CLOSE":
                bannerBgColor = Color.parseColor("#E65100"); // Orange
                break;
            case "STAIR_DROPOFF":
            case "FALL_DETECTED":
            case "MANUAL_SOS":
                bannerBgColor = Color.parseColor("#B71C1C"); // Red
                isEmergency = true;
                break;
            default:
                if (data.sos || data.fall) {
                    bannerBgColor = Color.parseColor("#B71C1C");
                    isEmergency = true;
                } else {
                    bannerBgColor = Color.parseColor("#1B5E20");
                }
                break;
        }

        bannerStatusContainer.setBackgroundColor(bannerBgColor);

        // 4. Prominent emergency card visibility
        if (isEmergency || data.sos || data.fall) {
            cardEmergencyAlert.setVisibility(View.VISIBLE);
            tvEmergencyTitle.setText("ALERT: " + data.status.replace("_", " "));
            tvEmergencySubtitle.setText(data.alertText);
        } else {
            cardEmergencyAlert.setVisibility(View.GONE);
        }

        // 5. Update GPS display
        if (LocationTrackingService.hasLocation) {
            tvGpsCoordinates.setText(String.format(Locale.US, "Lat: %.6f | Lng: %.6f",
                    LocationTrackingService.currentLat, LocationTrackingService.currentLng));
        }
    }

    private void checkAndDispatchEmergency(FirebaseCaneService.CaneData data) {
        boolean triggerSos = data.sos || data.fall
                || "MANUAL_SOS".equalsIgnoreCase(data.status)
                || "FALL_DETECTED".equalsIgnoreCase(data.status)
                || "STAIR_DROPOFF".equalsIgnoreCase(data.status);

        if (triggerSos) {
            // Sound and vibrate alert on phone
            triggerPhoneAlarm();

            // Check if status changed or 30-sec cooldown passed
            long now = System.currentTimeMillis();
            if (!data.status.equals(lastStatusHandled) || (now - lastSmsSentTime >= SMS_COOLDOWN_MS)) {
                lastStatusHandled = data.status;
                String text = data.alertText != null && !data.alertText.isEmpty() ? data.alertText : data.status;
                sendEmergencySms(text, false);
            }
        } else {
            lastStatusHandled = data.status;
        }
    }

    private void triggerPhoneAlarm() {
        vibrate(600);
        try {
            Uri alert = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            Ringtone r = RingtoneManager.getRingtone(getApplicationContext(), alert);
            if (r != null) r.play();
        } catch (Exception ignored) {}
    }

    private void sendEmergencySms(String alertText, boolean isForced) {
        long now = System.currentTimeMillis();
        if (!isForced && (now - lastSmsSentTime < SMS_COOLDOWN_MS)) {
            Log.d(TAG, "SMS on cooldown. Skipping repeated dispatch.");
            return;
        }

        String contact = prefs.getString(KEY_CONTACT, etEmergencyContact.getText().toString().trim());
        if (contact.isEmpty()) {
            Toast.makeText(this, "Emergency detected but no contact phone number saved!", Toast.LENGTH_LONG).show();
            speak("Emergency alert triggered, but no contact saved.");
            tvLastSmsStatus.setText("SMS Failed: No contact phone number saved!");
            return;
        }

        double lat = LocationTrackingService.currentLat;
        double lng = LocationTrackingService.currentLng;

        String mapLink = "https://maps.google.com/?q=" + lat + "," + lng;
        String message = "EMERGENCY ALERT from Smart Cane: " + alertText + ". Location: " + mapLink;

        try {
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(contact, null, message, null, null);

            lastSmsSentTime = now;
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss", Locale.getDefault());
            String timeStr = sdf.format(new Date(now));

            tvLastSmsStatus.setText("Last SMS Sent to " + contact + " at " + timeStr);
            tvLastSmsStatus.setTextColor(Color.parseColor("#00E676"));

            speak("Emergency SMS dispatched with live coordinates");
            Toast.makeText(this, "SMS Sent to " + contact, Toast.LENGTH_LONG).show();
        } catch (Exception e) {
            Log.e(TAG, "Failed to send SMS: " + e.getMessage());
            tvLastSmsStatus.setText("SMS Dispatch Error: " + e.getMessage());
            tvLastSmsStatus.setTextColor(Color.parseColor("#FF5252"));
        }
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
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            tts.setLanguage(Locale.US);
            tts.speak("Smart Cane system connected and active", TextToSpeech.QUEUE_FLUSH, null, "STARTUP");
        }
    }

    @Override
    protected void onDestroy() {
        FirebaseCaneService.stopListening();
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }
}
