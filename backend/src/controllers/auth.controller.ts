import { Request, Response } from "express";
import { registerUser, loginUser, getProfileById, updateProfileName } from "../services/auth.service";
import { AuthRequest } from "../middleware/authentication";

//register controller
export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//login controller
export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "INVALID_CREDENTIALS") {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get profile controller
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getProfileById(req.userId!);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update profile controller
export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const result = await updateProfileName(req.userId!, req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};