const volunteerCampaignConfig = {
  ckKitchen: {
    id: "7018Z000002jtq0QAA",
    images: ["cookies-1.jpg", "wraps.jpeg", "sandwiches.jpeg"],
  },
  doorfront: {
    id:
      process.env.NODE_ENV === "production"
        ? "701UP00000JyWOgYAN"
        : "701U800000KMZoQIAX",
    images: ["door-distribution.jpg"],
  },
  deliveryDrivers: {
    id:
      process.env.NODE_ENV === "production"
        ? "701UP00000KA6bhYAD"
        : "701U800000O3WxhIAF",
    images: ["driver-onboarding.jpg"],
  },
};

export default volunteerCampaignConfig;
