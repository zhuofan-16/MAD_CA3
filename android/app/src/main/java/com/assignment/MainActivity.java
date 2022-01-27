package com.assignment;

import com.facebook.react.ReactActivity;
import android.os.Bundle; // --> added

import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;

public class MainActivity extends ReactActivity {



  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Assignment";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null); // --> added
  }
}
