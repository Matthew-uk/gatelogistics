// models/Tracking.ts
import mongoose, { Schema, model, models } from 'mongoose';

export type TrackingEvent = {
  locationName: string;
  locationStatus: string;
  updatedAt?: string;
};

export interface ITracking {
  code: string; // unique numeric id or alphanumeric; we'll store both id and human code
  numberCode: string; // e.g. '1090' or numeric string
  trackingCode: string; // e.g. 'ATV7FATYCW'
  status: string;
  sender: {
    name?: string;
    email?: string;
    address?: string;
  };
  receiver: {
    name?: string;
    email?: string;
    address?: string;
  };
  parcel: {
    deliveryMode?: string;
    packageDescription?: string;
    totalWeight?: string;
    origin?: string;
    destination?: string;
    expectedPickupDate?: string;
  };
  events: TrackingEvent[];
  additionalInfo?: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt?: Date;
}

const eventSchema = new Schema(
  {
    locationName: String,
    locationStatus: String,
    updatedAt: String,
  },
  { _id: false },
);

const trackingSchema = new Schema<ITracking>(
  {
    code: { type: String, required: true, unique: true }, // human tracking code like ATV7...
    numberCode: { type: String, required: true, unique: true }, // for URLs e.g. 1090
    trackingCode: { type: String, required: true }, // duplicate for clarity
    status: { type: String, default: 'PENDING' },
    sender: { type: Object },
    receiver: { type: Object },
    parcel: { type: Object },
    events: { type: [eventSchema], default: [] },
    additionalInfo: String,
    createdBy: { type: String },
  },
  { timestamps: true },
);

const Tracking =
  models.Tracking || model<ITracking>('Tracking', trackingSchema);
export default Tracking;
