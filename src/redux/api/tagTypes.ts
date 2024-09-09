
export const tagTypes = {
  Service: "Service",
  Slot: "Slot",
  User: "User",
  Booking: "Booking",
  API: "API", // For any general API related caching or tagging
  Review: "Review"
}

export const tagProviders = [tagTypes.Slot, tagTypes.User, tagTypes.Booking, tagTypes.Service, tagTypes.Review];
