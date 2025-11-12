// import { useState, FormEventHandler } from "react";
// import { useNavigate } from "react-router-dom";

// import { useSubmitFormMutation } from "../../../state/apis/formApi";
// import Loading from "../../reusable/loading/Loading";

// const HomeChefOrientation = () => {
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");

//   const [submitForm, { isLoading }] = useSubmitFormMutation();

//   const navigate = useNavigate();

//   const onSubmit: FormEventHandler = (e) => {
//     e.preventDefault();
//     submitForm({
//       formData: {
//         email,
//         firstName,
//         lastName,
//         phone,
//       },
//       name: "HOME_CHEF_ORIENTATION",
//     })
//       .unwrap()
//       .then(() => {
//         navigate("/forms/form-sent", {
//           state: { message: "You will receive a confirmation email." },
//         });
//       });
//   };

//   const header = () => {
//     return (
//       <div className="form-item">
//         <h1>Home Chef Live Training</h1>
//         <p>
//           Thanks for signing up for the Home Chef Training on Wednesday, 11/5 at
//           6pm. This is a virtual event, and you'll receive an email inviation
//           after you sign up.
//         </p>
//         <br />
//         <p>
//           As a Home Chef, you'll be part of a heartwarming mission, donating
//           home-cooked meals made with love to Town Fridges in neighborhoods
//           facing food insecurity. Home Chef Volunteers cook 15-25 meals at home
//           with family and friends, procure ingredients and deliver to Town
//           Fridges where anyone can take a meal for free 24/7. CK provides
//           packaging, labels, local restaurant recipes, supplemental produce and
//           a tax deductible annual In-Kind Gift Donation receipt.
//         </p>
//         <br />
//         <p>
//           We can't wait to see you there! If you have any questions, feel free
//           to reach out at{" "}
//           <a href="mailto:mollye@ckoakland.org">mollye@ckoakland.org.</a>
//         </p>
//         <br />
//         <p>Let's make a difference together—see you soon! 🌟</p>
//         <br />
//         <br />
//         <p className="required">* Indicates required question</p>
//       </div>
//     );
//   };

//   return (
//     <>
//       {header()}
//       <div className="form-item">
//         <p>
//           <strong>The Home Chef Training is under way!</strong> Join us here:{" "}
//           <a
//             className="retro-link"
//             href="https://www.google.com/url?q=https%3A%2F%2Fus06web.zoom.us%2Fj%2F86339029491%3Fpwd%3DvYIMCaEk2O8C3FaKF5kfSb2siBAgUb.1&sa=D&source=calendar&ust=1762813500000000&usg=AOvVaw1wD5JwwqgI4pw9603y_vA0"
//           >
//             Zoom Link
//           </a>
//         </p>
//       </div>
//       {/* <form onSubmit={onSubmit}>
//         <div className="form-item">
//           <label>
//             Email<span className="required">*</span>
//           </label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-item">
//           <label>
//             First Name<span className="required">*</span>
//           </label>
//           <input
//             required
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>
//         <div className="form-item">
//           <label>
//             Last Name<span className="required">*</span>
//           </label>
//           <input
//             required
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//         <div className="form-item">
//           <label>
//             Phone Number<span className="required">*</span>
//           </label>
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>

//         {isLoading ? <Loading /> : <input type="submit" value="Submit" />}
//       </form> */}
//     </>
//   );
// };

// export default HomeChefOrientation;
