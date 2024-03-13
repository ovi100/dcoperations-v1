package com.dcoperations;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.view.KeyEvent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class SunmiScannerModule extends ReactContextBaseJavaModule {

  private static final String TAG = SunmiScannerModule.class.getSimpleName();
  private final ReactApplicationContext reactContext;
  private boolean isBroadcastReceiverRegistered = false;
  private BroadcastReceiver broadcastReceiver;

  public SunmiScannerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "SunmiScanner";
  }

  @ReactMethod
  public void startScan() {
    if (!isBroadcastReceiverRegistered) {
      registerBroadcastReceiver();
    }
  }

  @ReactMethod
  public void stopScan() {
    if (isBroadcastReceiverRegistered) {
      unregisterBroadcastReceiver();
    }
  }

  private void registerBroadcastReceiver() {
    if (broadcastReceiver == null) {
      broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
          String data = intent.getStringExtra("data");
          sendEvent("ScanDataReceived", data);
        }
      };
    }

    IntentFilter filter = new IntentFilter();
    filter.addAction("com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED");
    reactContext.registerReceiver(broadcastReceiver, filter);
    isBroadcastReceiverRegistered = true;
  }

  private void unregisterBroadcastReceiver() {
    if (broadcastReceiver != null && isBroadcastReceiverRegistered) {
      reactContext.unregisterReceiver(broadcastReceiver);
      isBroadcastReceiverRegistered = false;
    }
  }

  private void sendEvent(String eventName, String data) {
    WritableMap params = Arguments.createMap();
    params.putString("code", data);
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
  }

}
