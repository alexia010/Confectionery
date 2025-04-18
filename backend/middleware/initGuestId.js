import { v4 as uuidv4 } from 'uuid';
import constants from '../utils/constants.js';

const initGuestId = (req, res, next) => {
  const guestId = req.cookies.guest_id;

  if (!guestId) {
    const newGuestId = uuidv4();

    res.cookie('guest_id', newGuestId, {
      httpOnly: true,
      maxAge: constants.COOKIE_MAX_AGE,      // 7 zile
      sameSite: 'Lax'
    });

    req.guestId = newGuestId;
  } else {
    req.guestId = guestId;
  }

  next();
};

export default initGuestId;