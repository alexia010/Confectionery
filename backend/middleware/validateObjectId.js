import mongoose from 'mongoose';

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'ID invalid.' });
  }
  next();
};

export default validateObjectId;
