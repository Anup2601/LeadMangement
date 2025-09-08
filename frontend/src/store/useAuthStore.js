import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast";
// const BASE_URl= import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore= create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth: true,

    // checkAuth: async()=>{
    //     try{
    //         const res= await axiosInstance.get("/auth/check");
            
    //         set({authUser:res.data});
    //         get().connectSocket()
    //     }catch(error){
    //         console.log("Error in checkAuth:",error.response?.data?.message)
    //         set({authUser:null})
    //     }finally{
    //         set({isCheckingAuth:false})
    //     }
    // },
    signup: async (data)=>{
        // console.log("Data sent to /auth/signup:", data);
        set({isSigningUp:true});
        try{
            // toast.success("Account created successfully");
            const res=await axiosInstance.post("/auth/signup",data);
            console.log("res:",res);
            set({authUser: res.data});
            toast.success("Account created successfully");
        }catch (error){
            toast.error(error.response?.data?.message || "Signup failed");
        }finally {
            set({isSigningUp:false});
        }
    },
    logout: async()=>{
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }
    },
    login: async(data)=>{
        set({isLoggingIn:true});
          console.log("Login data sent to backend:", data); 
        try{
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data})
            toast.success("Account successfully Logged");
        }catch(error){
            toast.error(error.response?.data?.message || "Signup failed");
        }finally {
            set({isLoggingIn:false});
        }
    },
    

}));