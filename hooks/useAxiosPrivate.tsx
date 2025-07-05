// import { axiosPrivate } from "@/api/axios";
// import { useEffect } from "react";
// import useAppSelector from "./useAppSelector"; // Assuming you have this action
// import useRefreshToken from "./useRefreshToken";

// export default function useAxiosPrivate() {
//   const token = useAppSelector((state) => state.auth.token);
//   const refresh = useRefreshToken();

//   useEffect(() => {
//     // Request interceptor
//     const requestIntercept = axiosPrivate.interceptors.request.use(
//       async (config) => {
//         if (!config.headers["Authorization"] && token) {
//           config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     // Response interceptor
//     const responseIntercept = axiosPrivate.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevReq = error?.config;
//         if (error?.response?.status === 401 && !prevReq.sent) {
//           // dispatch(logout());
//           // router.replace("/");

//           prevReq.sent = true;
//           const accessToken = await refresh();
//           prevReq.headers["Authorization"] = `Bearer ${accessToken}`;
//           return axiosPrivate(prevReq);
//         }

//         return Promise.reject(error);
//       }
//     );

//     // Cleanup function
//     return () => {
//       axiosPrivate.interceptors.request.eject(requestIntercept);
//       axiosPrivate.interceptors.response.eject(responseIntercept);
//     };
//   }, [token, refresh]);

//   return axiosPrivate;
// }
