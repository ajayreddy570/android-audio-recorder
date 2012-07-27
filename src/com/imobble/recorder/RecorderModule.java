package com.imobble.recorder;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.annotations.Kroll;

import org.appcelerator.titanium.TiApplication;
import org.appcelerator.kroll.common.Log;
import org.appcelerator.kroll.common.TiConfig;
import android.media.MediaRecorder;
import android.media.MediaPlayer;
import java.io.IOException;
import java.io.File;
import android.net.Uri;

@Kroll.module(name="Recorder", id="com.imobble.recorder")
public class RecorderModule extends KrollModule
{

	// Standard Debugging variables
	private static final String LCAT = "RecorderModule";
	private static String mFileName = null;
	private MediaRecorder mRecorder = null;
	private MediaPlayer mPlayer = null;
	private String approot = null;
	
	public RecorderModule()
	{
		super();
	}

	@Kroll.method
	public void startRecord() {
		if (approot==null) approot = "/sdcard";
		File mFile = new File(approot, "audio.3gp");
		  
		if(mFile.delete())
			mFile = new File(approot, "audio.3gp");
		Uri mUri = Uri.fromFile(mFile);
		mFileName = mUri.getPath();
		mRecorder = new MediaRecorder();
		mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
		mRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
		mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
		mRecorder.setOutputFile(mFileName);

		try {
			mRecorder.prepare();
		} catch (IOException e) {
			Log.e(LCAT, "recorder prepare() failed");
		}

		mRecorder.start();
	}

	@Kroll.method
	public void stopRecord() {
		Log.d(LCAT, "stop recording");

		mRecorder.stop();
		mRecorder.release();
		mRecorder = null;
	}

	@Kroll.method
	public void startPlay() {
		mPlayer = new MediaPlayer();
		try {
			mPlayer.setDataSource(mFileName);
			mPlayer.prepare();
			mPlayer.start();
		} catch (IOException e) {
			Log.e(LCAT, "player prepare() failed");
		}
	}

	@Kroll.method
	public void stopPlay() {
		mPlayer.release();
		mPlayer = null;
	}

	@Kroll.setProperty @Kroll.method
	public void setApproot(String ar) {
		approot = ar;
	} 

	@Kroll.getProperty @Kroll.method
	public String getApproot() {
		return approot;
	}
}
