import { Fragment, useEffect, useState } from "react";
import "./User.scss";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SubmitButton from "../layout/button/SubmitButton";
import axios from "axios";
import { authMiddleware } from "../../utils";
const SignUp = () => {
  
  const [feedback, setFeedback] = useState("");

  const [formInputs, setFormInputs]: any = useState({})

  const handleChange = (e: any) => {
    if(e.target.name === "keywords") e.target.value = e.target.value.split(", ")
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleAssociationChange = (e: any) => {
    setFormInputs({
      ...formInputs,
      associationDetails: {
        ...formInputs.associationDetails, [e.target.name]: e.target.value
      }
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/auth/signup", formInputs);
      console.log(result);
      if (result.data.token) {
        localStorage.setItem("role", result.data.role)
        localStorage.setItem("token", result.data.token)
      }
      setFeedback("Signed up successfuly");
    } catch (err: any) {
      setFeedback(err.response.data || "Network error. try again");
    }
  };

  useEffect(() => {
    authMiddleware(true, false, true)
  }, []);

  return (
    <Fragment>
      <Header />
      <form>
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account.</p>
       <div className="account-type">
         <label>Account type:</label>
        <select onChange={(e) => handleChange(e)} name="role">
          <option value="user">user</option>
          <option value="association">association</option>
        </select>
         </div> 
        <br/>
        <label>Name: </label>
        <input type="text" name="name" onChange={(e) => handleChange(e)} value={formInputs?.name}/>
        <br/>
        <label>Email: </label>
        <input type="text" name="email" onChange={(e) => handleChange(e)} value={formInputs?.email}/>
        <br/>
        <label>Username: </label>
        <input type="text" name="username" onChange={(e) => handleChange(e)} value={formInputs?.username}/>
        <br/>
        <label>Password: </label>
        <input type="password" name="password" minLength={4} onChange={(e) => handleChange(e)} value={formInputs?.password}/>
        <br/>
        <label>Phone: </label>
        <input type="text" name="phone" onChange={(e) => handleChange(e)} value={formInputs?.phone}/>
        <br/>
        {formInputs.role === "user" && <>
        <label>Which field interests you?</label> <br /><br />
        <span className="examples"> (For example: soldiers, holocaust survivors, etc.) </span><br />
        <input type="text" name="keywords" onChange={(e) => handleChange(e)}/>
        <br/>
        </>}
        
        {formInputs.role === "association" && <>
        <label>Big Image url: </label>
        <input type="text" name="bigImage" onChange={(e) => handleAssociationChange(e)} value={formInputs?.bigImage}/>
        <br/>
        <label>Image url: </label>
        <input type="text" name="image" onChange={(e) => handleAssociationChange(e)} value={formInputs?.image}/>
        <br/>
        <label>Description: </label>
        <input type="text" name="description" onChange={(e) => handleAssociationChange(e)} value={formInputs?.description}/>
        <br/>
        <label>City: </label>
        <input type="text" name="city" onChange={(e) => handleAssociationChange(e)} value={formInputs?.city}/>
        <br/>
        <label>Street: </label>
        <input type="text" name="street" onChange={(e) => handleAssociationChange(e)} value={formInputs?.street}/>
        <br/>
        <label>Opening Hour: </label>
        <input type="text" name="openingHour" onChange={(e) => handleAssociationChange(e)} value={formInputs?.openingHour}/>
        <br/>
        <label>Closing Hour: </label>
        <input type="text" name="closingHour" onChange={(e) => handleAssociationChange(e)} value={formInputs?.closingHour}/>
        <br/>
        <label>Site Link: </label>
        <input type="text" name="siteLink" onChange={(e) => handleAssociationChange(e)} value={formInputs?.siteLink}/>
        <br/>
        </>}
        <div className="submit-form-btn">
                  <SubmitButton onClick={(e: any) => handleSubmit(e)} value={"Submit"} />
        </div>
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
        <b>{feedback}</b>
      </form>
      <Footer />
    </Fragment>
  );
};

export default SignUp;
