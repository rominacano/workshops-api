import mongoose from 'mongoose';

interface CarAttrs {
  patent: string;
  brand: string;
  carModel: string;
  year: number;
  engine: string;
  chassis: string;
}

interface CarModel extends mongoose.Model<CarDoc> {
  build(attrs: CarAttrs): CarDoc;
}

interface CarDoc extends mongoose.Document {
  patent: string;
  brand: string;
  carModel: string;
  year: number;
  engine: string;
  chassis: string;
}

const carSchema = new mongoose.Schema(
  {
    patent: {
      type: String,
      required: true,
      unique: true
    },
    brand: {
      type: String,
      required: true
    },
    carModel: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    engine: {
      type: String,
      required: false
    },
    chassis: {
      type: String,
      required: false
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

carSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  }
});

carSchema.statics.build = (attrs: CarAttrs) => {
  return new Car(attrs);
};

const Car = mongoose.model<CarDoc, CarModel>('Car', carSchema);

export { Car };
