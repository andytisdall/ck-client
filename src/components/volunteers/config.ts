const volunteerCampaignConfig = {
  ckKitchen: {
    id: "7018Z000002jtq0QAA",
    images: ["kitchen1.jpeg", "kitchen2.jpeg"],
  },
  doorfront: {
    id: "701UP00000JyWOgYAN",
    images: ["doorfront1.jpg", "doorfront2.jpg"],
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
    id:
      process.env.NODE_ENV === "production"
        ? "701UP00000Oyq4NYAR"
        : "701TH00000QTWFFYA5",
    images: ["bike_volunteers.jpg", "bikes2.jpeg", "bikes_3.jpeg"],
  },
  EOYDC2025: {
    id: "701UP00000Xj0VVYAZ",
    images: ["events/EOYDC_Winter_Wonderland.jpg"],
  },
};

export default volunteerCampaignConfig;
