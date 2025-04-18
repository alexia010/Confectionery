import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  sequenceValue: {
    type: Number,
    default: 0
  }
});

// Funcție statică pentru a obține și incrementa secvența
CounterSchema.statics.getNextSequence = async function (sequenceName) {
  const updatedCounter = await this.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );

  return updatedCounter.sequenceValue;
};

const Counter = mongoose.model('Counter', CounterSchema);

export default Counter;
