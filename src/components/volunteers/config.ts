const volunteerCampaignConfig = {
  ckKitchen: {
    id: "7018Z000002jtq0QAA",
    images: ["cookies-1.jpg", "wraps.jpeg", "sandwiches.jpeg"],
  },
  doorfront: {
    id: "701UP00000JyWOgYAN",
    images: ["door-distribution.jpg"],
  },
  deliveryDrivers: {
    id: "701UP00000KA6bhYAD",
    images: ["driver-onboarding.jpg"],
  },
  gala2025: {
    id:
      process.env.NODE_ENV === "production"
        ? "701UP00000Q6OboYAF"
        : "701TH00000QR0TEYA1",
    images: ["gala1.jpg"],
  },
  bike: {
    id: "701TH00000QTWFFYA5",
    images: ["bike_volunteers.jpg", "bikes2.jpeg", "bikes_3.jpeg"],
  },
};

export default volunteerCampaignConfig;
