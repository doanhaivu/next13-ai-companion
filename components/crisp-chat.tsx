"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("ce91e69d-9ac8-40b2-8a82-ec1ed0f2c335");
  }, []);

  return null;
};
