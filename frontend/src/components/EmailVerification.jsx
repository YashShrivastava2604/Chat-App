// To be implemented

// import { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export const EmailVerification = (email) => {
  
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [message, setMessage] = useState('');

//   const sendOtp = async () => {
//     try {
//         await axios.post('/api/otp/send', { email });
//         setOtpSent(true);
//         toast.success('OTP sent!');
//         setMessage('OTP sent to your email!');
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         toast.error('Failed to send OTP');
//         message('Failed to send OTP');
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post('/api/otp/verify', { email, otp });
//       if (res.data.success) {
//         setMessage('Email verified successfully!');
//         toast.success('Email verified successfully!');
//       } else {
//         setMessage('Invalid OTP');
//         toast.error('Invalid OTP');
//       }
//     } catch {
//       setMessage('Verification failed');
//       toast.error('Verification failed');
//     }
//   };

//   return (
//     <div className="p-4">
//       <div>
//         Email : {email}
//       </div>
//       {!otpSent ? (
//         <button onClick={sendOtp} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Send OTP
//         </button>
//       ) : (
//         <>
//           <div className="flex gap-2 my-2">
//             {[...Array(6)].map((_, idx) => (
//               <input
//                 key={idx}
//                 type="text"
//                 maxLength={1}
//                 className="w-10 h-12 text-center border rounded text-xl"
//                 value={otp[idx] || ''}
//                 onChange={e => {
//                   const val = e.target.value.replace(/[^0-9]/g, '');
//                   let newOtp = otp.split('');
//                   newOtp[idx] = val;
//                   setOtp(newOtp.join('').slice(0, 6));
//                   // Move focus to next box if value entered
//                   if (val && e.target.nextSibling) {
//                     e.target.nextSibling.focus();
//                   }
//                 }}
//                 onKeyDown={e => {
//                   if (e.key === 'Backspace' && !otp[idx] && e.target.previousSibling) {
//                     e.target.previousSibling.focus();
//                   }
//                 }}
//               />
//             ))}
//           </div>
//           <button onClick={verifyOtp} className="bg-green-500 text-white px-4 py-2 rounded">
//             Verify
//           </button>
//         </>
//       )}
//       <p className="mt-2 text-sm text-gray-700">{message}</p>
//     </div>
//   );
// }
