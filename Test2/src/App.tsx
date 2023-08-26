import {
  FrappeProvider,
  useFrappeCreateDoc,
  // useFrappeFileUpload,
} from "frappe-react-sdk";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";
function App() {
  const [userForm, setUserForm] = useState({
    user_name: "",
    email: "",
    address: "",
    in_time: getCurrentTime(),
    employee_id: "",
    mobile: "",
    myOTP: "",
    image: null,
  });
  console.log(userForm.image);

  const { createDoc, } = useFrappeCreateDoc();

  const handleCreateDocument = () => {
    const formData = {
      title: "d1", // Example title
      user_name: userForm.user_name,
      email: userForm.email,
      address: userForm.address,
      in_time: userForm.in_time,
      employee_id: userForm.employee_id,
      mobile: userForm.mobile,
      image: userForm.image,
    };

    createDoc("Guest_Agnikul", formData)
      .then(() => {
        console.log("Created Successfully");
      })
      .catch((error) => {
        console.log("Error in Creation", error);
      });
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  return (
    <div className="App">
     
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/OutTime" element={<OutTime />} />
          <Route path="/completePage" element={<CompletePage />} />
          <Route
            path="/visitorDetails"
            element={
              <VisitorDetails
                handleCreateDocument={handleCreateDocument}
                forms={[userForm, setUserForm]}
              />
            }
          />
          <Route
            path="/form2"
            element={<VisitorDetails2 forms={[userForm, setUserForm]} />}
          />
          <Route path="/cameraOpening" element={<OpenCameraRoutePage />} />
          <Route path="/ThankyouPage" element={<ThankyouPage />} />
          <Route
            path="/frontCam"
            element={
              <WebcamCapture
                handleCreateDocument={handleCreateDocument}
                forms={[userForm, setUserForm]}
              />
            }
          />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}
function VisitorDetails(props: any) {
  // const { data } = useFrappeGetDocList("Guest_Agnikul", {
  //   fields: ["user_name", "mobile", "email"],
  // });
  // const navigate = useNavigate();
  const [userForm, setUserForm] = props.forms;
  const updateForm = (value: any, field: string) => {
    setUserForm({ ...userForm, [field]: value });
  };

  const generateOTP = (function () {
    let otpValue = "";

    return function () {
      const otpLength = 6;
      const characters = "0123456789";
      otpValue = "";

      for (let i = 0; i < otpLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otpValue += characters.charAt(randomIndex);
      }

      return otpValue;
    };
  })();

  const generateAndSendOTP = () => {
    const generatedOTP = generateOTP(); // Generate OTP
    setUserForm({ ...userForm, myOTP: generatedOTP });
    const url = `http://login4.spearuc.com/MOBILE_APPS_API/sms_api.php?type=smsquicksend&user=iitmadras&pass=welcome&sender=EVOLGN&t_id=1707166841244742343&to_mobileno=${userForm.mobile}&sms_text=Dear%20Applicant,%20Your%20OTP%20for%20Mobile%20No.%20Verification%20is%20${generatedOTP}%20.%20MJPTBCWREIS%20-%20EVOLGN%20;`;

    fetch(url)
      .then((response) => response.text())
      // .then((data) => {
      //   // OTP sent successfully
      //   // Proceed to the next page
      // })
      // .catch((error) => {
      //   // Handle error in sending OTP
      // });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();

    generateAndSendOTP();
    // navigate("/form2");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ width: "1535px", height: "707px", background: "white" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            marginLeft: "50px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "550px",
              height: "fit-content",
              borderRadius: "10px",
              padding: "5px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            <img
              style={{
                width: "100px",
                height: "100px",
                marginTop: "10px",
                marginLeft: "210px",
              }}
              src="	https://agnikul.in/group-10.png"
            />

            <div>
              <h2
                style={{
                  color: "#1F272E",
                  marginLeft: "150px",
                  marginTop: "-10px",
                }}
              >
                Welcome to Agnikul
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "row",
                padding: "38px",
              }}
            >
              <TextField
                label="Name"
                onChange={(e) => {
                  updateForm(e.target.value, "user_name");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
              />
              <TextField
                label="E-mail"
                onChange={(e) => {
                  updateForm(e.target.value, "email");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "row",
                padding: "38px",
              }}
            >
              <TextField
                label="Address"
                onChange={(e) => {
                  updateForm(e.target.value, "address");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
              />
              <TextField
                label="In-Time"
                value={userForm.in_time}
                onChange={(e) => {
                  updateForm(e.target.value, "in_time");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "row",
                padding: "38px",
              }}
            >
              <TextField
                label="Employee-ID"
                onChange={(e) => {
                  updateForm(e.target.value, "employee_id");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
              />
              <TextField
                label="Mobile"
                onChange={(e) => {
                  updateForm(e.target.value, "mobile");
                }}
                style={{
                  width: "320px",
                  height: "2em",
                  backgroundColor: "transparent",
                  borderRadius: ".375rem",
                }}
              />
            </div>

            <div style={{ marginLeft: "400px", marginTop: "50px" }}>
  <Link
    to="/form2"
    style={{
      textDecoration: "none", // Remove underline
      color: "white", // Text color
      backgroundColor: "#313B44",
      borderRadius: ".375rem",
      width: "100px",
      height: "2em",
      display: "flex",
      justifyContent: "center",
      background: "#213547",
      alignItems: "center",
      fontFamily: "proxima-nova ",
      fontStyle: "normal",
      fontWeight: "400",
      margin: "10px",
      textAlign: "center",
    }}
    onClick={generateAndSendOTP} // Call the function when clicking the link
  >
    {"Next"}
  </Link>
</div>

          </div>
        </div>
      </div>
    </form>
  );
}

function VisitorDetails2(props: any) {
  // const { data } = useFrappeGetDocList("Guest_Agnikul", {
  //   fields: ["user_name", "mobile", "email"],
  // });
  // const navigate = useNavigate();

  return (
    <div
      style={{
        width: "1535px",
        height: "707px",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          marginLeft: "50px",
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "550px",
              height: "250px",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            <div
              style={{
                color: "#1F272E",
                // marginLeft: "180px",
                marginTop: "-10px",
                // padding: "30px",
              }}
            >
              <h2
                style={{
                  color: "#1F272E",
                  marginLeft: "180px",
                  marginTop: "-10px",
                  padding: "30px",
                }}
              >
                Enter OTP
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                gap: "30px",
                flexDirection: "column",
                padding: "-2px",
              }}
            >
              <OtpInput myOTP={props.forms[0].myOTP} />
              {/* <button
                style={{
                  backgroundColor: "rgb(12 110 236)",
                  borderRadius: ".375rem",
                  width: "100px",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",

                  alignItems: "center",
                  fontFamily: "proxima-nova ",
                  fontStyle: "normal",
                  fontWeight: "400",
                  margin: "10px",
                  padding: "25px",
                }}
                disabled={loading}
              >
                {loading ? "Receive OTP....." : "Receive OTP"}
              </button> */}
            </div>

            <div style={{ marginLeft: "400px", marginTop: "50px" }}>
              {/* <button
                type="submit"
                style={{
                  backgroundColor: "#313B44",
                  borderRadius: ".375rem",
                  width: "100px",
                  height: "2em",
                  display: "flex",
                  justifyContent: "center",
                  background: "#213547",
                  alignItems: "center",
                  fontFamily: "proxima-nova ",
                  fontStyle: "normal",
                  fontWeight: "400",
                  margin: "10px",
                }}
                disabled={loading}
                onClick={() => navigate("/form2")}
              >
                {loading ? "Submit....." : "Submit"}
              </button> */}
              {/* {error && <div>Error: {error.message}</div>} */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function OtpInput(props: any) {
  // const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]); // State to hold the values of each input field
  console.log(otpValues);
  const handleInput = (index: any, value: any) => {
    const numericValue = value.replace(/\D/g, ""); // Remove non-digit characters

    // Update the value at the specified index
    const newOtpValues = [...otpValues];
    newOtpValues[index] = numericValue;
    setOtpValues(newOtpValues);

    // Move cursor to the next input field if there's a value and there's a next field
    if (numericValue !== "" && index < otpValues.length - 1) {
      // Use the next input element directly
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    if (newOtpValues[newOtpValues.length - 1] !== "") {
      if (props.myOTP === newOtpValues.join("")) {
        setTimeout(() => {
          alert("OTP Verified Successfully");
        }, 500);
        // setTimeout(() => {
        //   navigate("/cameraOpening");
        // }, 500);

        // setTimeout(() => {
        //   navigate("/frontCam");
        // }, 6000);
      } else {
        // Introduce a 2-second delay before showing the alert
        setTimeout(() => {
          alert("Invalid OTP");
          newOtpValues.fill("");
        }, 1000); // 2000 milliseconds = 2 seconds
      }
    }
  };

  return (
    <div>
    <div
      style={{
        // width: "100vw",
        // height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        gap: "10px",
      }}
    >
      {otpValues.map((value, index) => (
        <>
          <TextField
            key={index}
            variant="outlined"
            id={`otp-input-${index}`}
            sx={{
              width: "60px",
              height: "40px",
              background: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              textAlign: "center",
              "& input": {
                fontSize: "54px",
                padding: "10",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                outline: "none",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                height: "0.9em",
              },
            }}
            type="text"
            value={value}
            onChange={(e) => handleInput(index, e.target.value)}
            inputProps={{
              maxLength: 1,
              // Add the custom event handler
            }}
          />
          {index === 1 || index === 3 ? (
            <h6
              style={{
                color: "black",
              }}
            >
              -
            </h6>
          ) : null}
        </>
      ))}
     

    </div>
     <Link    style={{
        // width: "100vw",
        // height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        gap: "10px",
      }} to="/frontCam">Click Next to Take Photo</Link>
     </div>
  );
}

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

export const WebcamCapture = (props: any) => {
  const [userForm, setUserForm] = props.forms;

  const webcamRef = useRef<Webcam>(null);
  // const navigate = useNavigate();
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setUserForm({ ...userForm, image: imageSrc });
    }
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        gap: "10px",
      }}
    >
      <div className="webcam-container">
        <div
          className="webcam-img"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            width: "900px",
            height: "550px",
          }}
        >
          {userForm.image === null ? (
            <Webcam
              audio={false}
              height={500}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={920}
              videoConstraints={videoConstraints}
            />
          ) : (
            <img
              style={{
                width: "30vw",
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                gap: "10px",
              }}
              src={userForm.image}
              alt="Captured"
            />
          )}
        </div>
        <div>
          {userForm.image !== null ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setUserForm({ ...userForm, image: null });
              }}
              className="webcam-btn"
            >
              Retake Image
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="webcam-btn"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "420px",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              Capture
            </button>
          )}
           
          <button
            onClick={() => {
              props.handleCreateDocument();
             
             

            }}
            className="webcam-btn"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "720px",
            }}
          >
           Save
          </button>
          <Link to="/ThankyouPage">Next</Link>

        </div>
      </div>
    </div>
  );
};

function OpenCameraRoutePage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        gap: "10px",
        color: "black",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "550px",
          height: "250px",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        Submit Photo ID for Verification
      </div>
    </div>
  );
}

function ThankyouPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        gap: "10px",
        color: "black",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "550px",
          height: "250px",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "20px",
          flexDirection: "column",
        }}
      >
        <div> Successfully</div> <div>Registered</div>
        <Link to="/">Go to Main Page</Link>
      </div>
    </div>
  );
}

function WelcomePage() {
 
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        gap: "10px",
        color: "black",
      }}
    >
      <Link to="/visitorDetails">

      <div
        className="register"
       
        style={{
          backgroundColor: "white",
          width: "350px",
          height: "250px",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Register
      </div>
      </Link>
      <Link to="/OutTime">
      <div
       
        style={{
          backgroundColor: "white",
          width: "350px",
          height: "250px",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Out Time
      </div>
        </Link>
    </div>
  );
}

// function OutTime() {
//   const { createDoc } = useFrappeCreateDoc();
//   const [userForm2, setUserForm2] = useState({
//     name1: "",
//     out_time: "",
//   });
//   const updateForm = (value: any, field: string) => {
//     setUserForm2({ ...userForm2, [field]: value });
//   };

//   const handleCreateDocument = () => {
//     const formData = {
//       name1: userForm2.name1,
//       out_time: userForm2.out_time,
//     };

//     createDoc("Out_Time_Datas", formData)
//       .then(() => {
//         console.log("Created Successfully");
//       })
//       .catch((error) => {
//         console.log("Error in Creation", error);
//       });
//   };
//   return (
//     <div>
//       <form
//         onSubmit={(event) => {
//           event.preventDefault();
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             gap: "30px",
//             flexDirection: "row",
//             padding: "38px",
//           }}
//         >
//           <TextField
//             label="Name"
//             onChange={(e) => {
//               updateForm(e.target.value, "name1");
//             }}
//             style={{
//               width: "320px",
//               height: "2em",
//               backgroundColor: "transparent",
//               borderRadius: ".375rem",
//             }}
//           />
//           <TextField
//             label="Out Time"
//             onChange={(e) => {
//               updateForm(e.target.value, "out_time");
//             }}
//             style={{
//               width: "320px",
//               height: "2em",
//               backgroundColor: "transparent",
//               borderRadius: ".375rem",
//             }}
//           />

//           <button
//             type="submit"
//             onClick={() => {
//               handleCreateDocument();
//             }}
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

function OutTime() {
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  const { createDoc } = useFrappeCreateDoc();
  // const navigate = useNavigate();
  const [outTime, setOutTime] = useState(getCurrentTime());
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      out_time: getCurrentTime(),
    };

    createDoc("Out_Time_Datas", formData)
      .then(() => {
        console.log("Created Successfully");

        // setTimeout(() => {
        //   navigate("/completePage");
        // }, 4000);

      //   setTimeout(() => {
      //     navigate("/");
      //   }, 8000);
      })
      .catch((error) => {
        console.log("Error in Creation", error);
      });
  };
  return (
    <div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          gap: "10px",
          color: "black",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              gap: "30px",
              flexDirection: "row",
              padding: "38px",
            }}
          >
            <TextField
              label="Out Time"
              value={outTime}
              onChange={(e) => {
                setOutTime(e.target.value);
              }}
              style={{
                width: "320px",
                height: "2em",
                backgroundColor: "transparent",
                borderRadius: ".375rem",
              }}
            />
<Link to="/completePage">

            <button type="submit">Submit</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function CompletePage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        gap: "10px",
        color: "black",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "550px",
          height: "250px",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "700",
          fontSize: "20px",
          flexDirection: "column",
        }}
      >
        <div>Thank You for Visiting</div> <div>Agnikul Cosmos</div>
        <Link to="/">Go to Main Page</Link>
      </div>
    </div>
  );
}

export default App;
