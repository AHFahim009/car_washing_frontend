initial value: {

  selectedService: {
    name: string;
    description: string;
    price: number;
    duration: number;
    SelectedSlot: string;
  }
  Booking = {
    customer: string;
    service: string;
    slot: string;
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: number;
    registrationPlate: string;
  }
}

//  make booking slice. here will be two reducer one is for addSelected service data and other reducer will collect booking data