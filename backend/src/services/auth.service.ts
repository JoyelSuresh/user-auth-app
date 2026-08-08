import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { RegisterInput, LoginInput, UpdateProfileInput } from "../validators/auth.validator";

export const registerUser = async (data: RegisterInput) => {
  const { email, password, name } = data;

  // Step 1: Check whether email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  // Step 2: Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Step 3: Save user into MongoDB
  const user = await User.create({
    email,
    name,
    passwordHash,
  });

  // Step 4: Generate JWT
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "7d",
    }
  );

  // Step 5: Convert mongoose document into plain object
  const userObject = user.toObject();

  // Step 6: Create a new object without passwordHash
  const { passwordHash: _, ...userWithoutPassword } = userObject;

  return {
    user: userWithoutPassword,
    token,
  };
};

//login service
export const loginUser = async (data: LoginInput) => {
  const { email, password } = data;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "7d",
    }
  );

  // Remove sensitive fields
  const userObject = user.toObject();

  //Create a new object without passwordHash
  const { passwordHash: _, ...userWithoutPassword } = userObject;

  return {
    user: userWithoutPassword,
    token,
  };
};

export const getProfileById = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const userObject = user.toObject();

  //Create a new object without passwordHash
  const { passwordHash: _, ...userWithoutPassword } = userObject;

  return userWithoutPassword;
};

//update profile service
export const updateProfileName = async (userId: string, data: UpdateProfileInput) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      name: data.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const userObject = user.toObject();

  //Create a new object without passwordHash
  const { passwordHash: _, ...userWithoutPassword } = userObject;

  return userWithoutPassword;
};