import bcryptjs from 'bcryptjs';
import crypto from 'crypto';


import {User} from "../models/user.model.js";
import {generateVerificationExpiresTime, generateVerificationToken,generateTokenAndSetCookie} from '../utils/authUtils.js';
import { send } from 'process';
import exp from 'constants';

export const signup=async (req,res)=>{
    const {name,password,email}=req.body;

    try{
        if(!name || !password || !email){
            // return res.status(400).json({message: "All fields are required"});
            throw new Error("All fields are required");
        }

        const userExist=await User.findOne({email});

        if(userExist){
            throw new Error("Email already exists");
        }
        
        const hashedPassword=await bcryptjs.hash(password,10);

        const verificationToken=generateVerificationToken();
        const verificationExpireTime=generateVerificationExpiresTime();

        const user=new User({
            name,
            password:hashedPassword,
            email,
            verificationToken:verificationToken,
            verificationExpires:verificationExpireTime,
        });

        await user.save(); 

        //jwt
        generateTokenAndSetCookie(res,user._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,   
                password: undefined,
            },
        });

    }catch(error){
        res.status(400).json({success: false, message: error.message,});
    }
}
export const login=async (req,res)=>{
   
    const {email,password}=req.body;
   try{
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({success:false,message: "Invalid credentials"});
        }

        const isPasswordValid=await bcryptjs.compare(password,user.password);

        if(!isPasswordValid)
        {
            return res.status(400).json({success:false,message: "Invalid credentials"});
        }

        generateTokenAndSetCookie(res,user._id);

        user.lastLogin=Date.now();
        await user.save();

        res.status(200).json({ success: true,message: "Logged in successfully",user:{
                ...user._doc,
                password: undefined
            }
        });
   }catch(error){
        console.log("Error in login",error);
        res.status(400).json({success: false, message: error.message,});
   }
}
export const logout=async (req,res)=>{
   
    res.clearCookie("token");
    res.status(200).json({message: "Logged out successfully"});
}

export const checkAuth = async (req, res) => {
    try {
      // Find user by ID and return all details except password
      const user = await User.findById(req.userId).select('-password');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      console.log('FUNCTIA AUTH');
      console.log(user);
      // Manually construct the response to ensure all fields are included
      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        phone:user.phone,
        address:user.adress,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
        verificationToken: user.verificationToken,
        verificationExpires: user.verificationExpires
      };
  
      res.status(200).json({
        success: true,
        user: userResponse
      });
    } catch (error) {
      console.error("Error in checkAuth:", error);
      res.status(500).json({
        success: false, 
        message: "Internal server error"
      });
    }
};


export const updateProfile = async (req, res) => {
    try {
      const userId = req.userId; // From verifyToken middleware
      const { name, email, phone, adress } = req.body;
      
      // Ensure only allowed fields are being updated
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (email !== undefined) {
          // Check if email already exists for another user
          const emailExists = await User.findOne({ email, _id: { $ne: userId } });
          if (emailExists) {
              return res.status(400).json({
                  success: false,
                  message: "Email already in use by another account"
              });
          }
          updateData.email = email;
      }
      if (phone !== undefined) updateData.phone = phone;
      if (adress !== undefined) updateData.adress = adress;
      
      // Return error if no valid fields to update
      if (Object.keys(updateData).length === 0) {
          return res.status(400).json({
              success: false,
              message: "No valid fields to update. You can only update name, email, phone, and adress."
          });
      }
      
      // Find and update user
      const user = await User.findByIdAndUpdate(
          userId,
          updateData,
          { new: true, runValidators: true }
      ).select('-password');
      
      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found"
          });
      }
      
      // Return updated user
      res.status(200).json({
          success: true,
          message: "Profile updated successfully",
          user
      });
      
  } catch (error) {
      console.error("Error in updateProfile:", error);
      res.status(500).json({
          success: false,
          message: error.message || "Internal server error"
      });
  }
};
// Update password (admin only)
export const updatePassword = async (req, res) => {
  try {
      // Check if user is admin (should be handled by middleware, but double-checking)
      if (req.userRole !== 'admin') {
          return res.status(403).json({
              success: false,
              message: "Access denied. Admin privileges required."
          });
      }
      
      const { userId, newPassword } = req.body;
      
      if (!userId || !newPassword) {
          return res.status(400).json({
              success: false,
              message: "User ID and new password are required"
          });
      }
      
      // Minimum password length check
      if (newPassword.length < 6) {
          return res.status(400).json({
              success: false, 
              message: "Password must be at least 6 characters long"
          });
      }
      
      // Find user
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found"
          });
      }
      
      // Hash new password
      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      
      // Update password
      user.password = hashedPassword;
      await user.save();
      
      res.status(200).json({
          success: true,
          message: "Password updated successfully"
      });
      
  } catch (error) {
      console.error("Error in updatePassword:", error);
      res.status(500).json({
          success: false,
          message: error.message || "Internal server error"
      });
  }
};

// Admin functions

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {

    console.log(req.userId);
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    
      
      const users = await User.find().select('-password');
      console.log(users);
      res.status(200).json({
          success: true,
          count: users.length,
          users
      });
      
  } catch (error) {
      console.error("Error in getAllUsers:", error);
      res.status(500).json({
          success: false,
          message: error.message || "Internal server error"
      });
  }
};
// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
      // Check if user is admin (should be handled by middleware, but double-checking)
      if (req.userRole !== 'admin') {
          return res.status(403).json({
              success: false,
              message: "Access denied. Admin privileges required."
          });
      }
      
      const { userId, role } = req.body;
      
      if (!userId || !role) {
          return res.status(400).json({
              success: false,
              message: "User ID and role are required"
          });
      }
      
      // Validate role
      const validRoles = ['guest', 'user', 'cofetar', 'admin'];
      if (!validRoles.includes(role)) {
          return res.status(400).json({
              success: false,
              message: "Invalid role. Must be one of: guest, user, cofetar, admin"
          });
      }
      
      // Find and update user
      const user = await User.findByIdAndUpdate(
          userId,
          { role },
          { new: true, runValidators: true }
      ).select('-password');
      
      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found"
          });
      }
      
      res.status(200).json({
          success: true,
          message: `User role updated to ${role} successfully`,
          user
      });
      
  } catch (error) {
      console.error("Error in updateUserRole:", error);
      res.status(500).json({
          success: false,
          message: error.message || "Internal server error"
      });
  }
};


export const deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const requestingUserId = req.userId;
  
      // Verifică dacă utilizatorul autentificat este admin
      const requestingUser = await User.findById(requestingUserId);
      if (!requestingUser) {
        return res.status(404).json({
          success: false,
          message: "Requesting user not found",
        });
      }
  
      const isAdmin = requestingUser.role === 'admin';
  
      // Verifică dacă utilizatorul încearcă să-și șteargă propriul cont sau este admin
      if (userId !== requestingUserId && !isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You can only delete your own account.",
        });
      }
  
      // Șterge utilizatorul
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error in deleteUser:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  };

export const updateUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const updateData = req.body;
      
      // Optional: Add validation
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      // IMPORTANT: Dacă actualizarea include o parolă, aceasta trebuie hashuită înainte de salvare
      if (updateData.password) {
        updateData.password = await bcryptjs.hash(updateData.password, 10);
      }
      
      if (updateData.role && !['user', 'admin', 'cofetar', 'guest'].includes(updateData.role)) {
        return res.status(400).json({ message: 'Invalid role value' });
      }
      // Find and update the user
      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { $set: updateData }, 
        { 
          new: true,    // Return the updated document
          runValidators: true  // Run mongoose validation
        }
      );
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove sensitive information before sending
      const userResponse = updatedUser.toObject();
      delete userResponse.password; // Elimină parola din răspuns
      
      res.status(200).json(userResponse);
    } catch (error) {
      console.error('Update profile error:', error);
        
      // Handle specific mongoose validation errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Validation Error',
          errors: Object.values(error.errors).map(err => err.message)
        });
      }
      
      res.status(500).json({ 
        message: 'Server error during profile update',
        error: error.message 
      });
    }
  };

  // export const createAccount = async (userData) => {
  //   try {
  //     // Destructure known fields with defaults
  //     const {
  //       name = '',
  //       email = '',
  //       password = '',
  //       phone = '',
  //       adress = '',
  //       role = 'user',
  //       // Capture any additional fields
  //       ...additionalFields
  //     } = userData;
      
  //     // Validate required fields based on role
  //     if (role !== 'guest') {
  //       if (!name.trim()) {
  //         throw new Error("Numele este obligatoriu");
  //       }
        
  //       if (!email.trim()) {
  //         throw new Error("Email-ul este obligatoriu");
  //       }
        
  //       // Email format validation
  //       const emailRegex = /\S+@\S+\.\S+/;
  //       if (!emailRegex.test(email)) {
  //         throw new Error("Adresa de email nu este validă");
  //       }
        
  //       // Password validation for new users
  //       if (!password.trim()) {
  //         throw new Error("Parola este obligatorie pentru utilizatorii noi");
  //       }
        
  //       if (password.length < 6) {
  //         throw new Error("Parola trebuie să conțină minim 6 caractere");
  //       }
  //     }
  
  //     // Check if user already exists
  //     const userExist = await User.findOne({ email });
  //     if (userExist) {
  //       throw new Error("Un utilizator cu acest email există deja");
  //     }
  
  //     // Hash password if provided
  //     const hashedPassword = password 
  //       ? await bcryptjs.hash(password, 10) 
  //       : undefined;
  
  //     // Generate verification token and expiration time
  //     const verificationToken = generateVerificationToken();
  //     const verificationExpireTime = generateVerificationExpiresTime();
  
  //     // Prepare user data object
  //     const newUserData = {
  //       name,
  //       email,
  //       password: hashedPassword,
  //       phone,
  //       adress,
  //       role,
  //       verificationToken,
  //       verificationExpires: verificationExpireTime,
  //       // Spread any additional fields
  //       ...additionalFields
  //     };
  
  //     // Create new user object
  //     const newUser = new User(newUserData);
  
  //     // Save the user
  //     await newUser.save();
  
  //     // Return user details without password
  //     return {
  //       success: true,
  //       message: "Utilizator creat cu succes",
  //       user: {
  //         ...newUser._doc,
  //         password: undefined
  //       }
  //     };
  
  //   } catch (error) {
  //     console.error("Eroare la crearea utilizatorului:", error);
  //     return {
  //       success: false, 
  //       message: error.message
  //     };
  //   }
  // };

  export const createAccount = async (req, res) => {
    try {
        // Destructurare câmpuri din corpul cererii
        const { 
            name = '', 
            email = '', 
            password = '', 
            phone = '', 
            adress = '', 
            role = 'user',
            ...additionalFields 
        } = req.body;

        console.log('Date primite:', { 
            name, 
            email, 
            password, 
            phone, 
            adress, 
            role 
        });

        // Validare câmpuri obligatorii în funcție de rol
        if (role !== 'guest') {
            if (!name || !name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Numele este obligatoriu"
                });
            }

            if (!email || !email.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Email-ul este obligatoriu"
                });
            }

            // Validare format email
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Adresa de email nu este validă"
                });
            }

            // Validare parolă pentru utilizatori noi
            if (!password || !password.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Parola este obligatorie pentru utilizatorii noi"
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Parola trebuie să conțină minim 6 caractere"
                });
            }
        }

        // Verifică dacă utilizatorul există deja
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "Un utilizator cu acest email există deja"
            });
        }

        // Hash parolă
        const hashedPassword = password 
            ? await bcryptjs.hash(password, 10)
            : undefined;

        // Generare token și timp expirare verificare
        const verificationToken = generateVerificationToken();
        const verificationExpireTime = generateVerificationExpiresTime();

        // Pregătire date utilizator
        const newUserData = {
            name,
            email,
            password: hashedPassword,
            phone,
            adress,
            role,
            verificationToken,
            verificationExpires: verificationExpireTime,
            ...additionalFields
        };

        // Creare și salvare utilizator nou
        const newUser = new User(newUserData);
        await newUser.save();

        // Răspuns de succes
        res.status(201).json({
            success: true,
            message: "Utilizator creat cu succes",
            user: {
                ...newUser._doc,
                password: undefined
            }
        });

    } catch (error) {
        console.error("Eroare la crearea utilizatorului:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Eroare internă la server"
        });
    }
};
;