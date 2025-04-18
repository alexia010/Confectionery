import express from 'express';
import { signup, 
         login, 
         logout, 
         checkAuth,
         updateProfile,
         updatePassword,
         getAllUsers,
         updateUserRole,
         deleteUser,
         updateUserProfile,
         createAccount
          } from '../controllers/auth.controller.js';
import verifyToken from '../middleware/verifyToken.js';
import { authorizeAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

// next in verifyToken apeleaza checkAuth
router.get("/check-auth", verifyToken,checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post('/me', verifyToken, updateProfile);
// router.delete('/me', verifyToken, (req, res) => {
//     // Set req.params.userId to the current user's ID for the deleteUser controller
//     req.params.userId = req.userId;
//     deleteUser(req, res);
// });

// Admin routes (require admin privileges)
router.get('/', verifyToken, getAllUsers);
router.post('/role', verifyToken, authorizeAdmin, updateUserRole);
router.post('/password', verifyToken, authorizeAdmin, updatePassword); // Admin-only password update
router.delete('/:userId', verifyToken, deleteUser); // Admin can delete any user
router.patch('/:userId', verifyToken, updateUserProfile);
router.post('/addUser',verifyToken,createAccount);

export default router;