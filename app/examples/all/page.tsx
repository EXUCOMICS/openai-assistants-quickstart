"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/weather";
import FileViewer from "../../components/file-viewer";

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState({});

  const functionCallHandler = async (call) => {
    if (call?.function?.name !== "get_weather") return;
    const args = JSON.parse(call.function.arguments);
    const data = getWeather(args.location);
    setWeatherData(data);
    return JSON.stringify(data);
  };

  return (
    <main className={styles.main}>
      {/*  Logo section */}
      <div className={styles.logoContainer}>
        <img
          src="/EXU-LOGO.png"
          alt="EXU Logo"
          className={styles.logo}
        />
      </div>

      {/*  Chat layout */}
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget {...weatherData} />
          <FileViewer />
        </div>

        <div className={styles.chatContainer}>
          <Chat functionCallHandler={functionCallHandler} />
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
