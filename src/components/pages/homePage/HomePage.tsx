/* eslint-disable react-hooks/exhaustive-deps */
import Card from "../../layout/card/Card";
import "./HomePage.scss";
import MobileNav from "./mobile-nav/MobileNav";
import About from "./about/About";
import Header from "../../header/Header";
import PopularAssociation from "./PopularAssociation";
import Volunteering from "./Volunteering";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import FounderItem from "./FounderItem";
import { useEffect } from "react";
import { fetchFounders } from "../../../store/founderDataSlice";
import { fetchVolunteering } from "../../../store/volunteeringDataSlice";
import {fetchAssociations} from "../../../store/AssociationDataSlice";
import { useSelector } from "react-redux";
import { useAppDispatch} from "../../../store/store";
import axios from "axios";

const HomePage = () => {
  const dispatch= useAppDispatch();
  const {volunteering}= useSelector((state:any)=> state.volunteering);
  const {founders}= useSelector((state:any)=> state.founders);
  const [associations, setAssociations] = useState([])
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/auth/getByRole/association")
      setAssociations(res.data.result)
    }
    catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    dispatch(fetchAssociations()) 
    dispatch(fetchFounders()) 
    dispatch(fetchVolunteering()) 
    },[]);


  return (
    <Fragment>
      <Header />
      <div className="card-bg">
        <Card>
          <p className="tlc-title">
            <h3>TLC</h3>
            Tender, Loving, Care
          </p>
        </Card>
      </div>
      <MobileNav />
      <div className="data-section">
        <p className="sub-title">ASSOCIATIONS: </p>
        <PopularAssociation data={associations} key={0}/>
        <Link to={"/associations"} className="all-associations-desktop-btn">
          All Associations {">>"}
        </Link>
        <p className="sub-title">LAST MINUTE VOLUNTEERING:</p>
        <Volunteering volunteering={volunteering} key={0}/>
        <Link to={"/volunteering/1"} className="all-associations-desktop-btn">
          All Volunteering {">>"}
        </Link>
      </div>
      <p className="about-title">ABOUT US :</p>      
      <About />      
      <p className="sub-title">OUR FOUNDERS :</p>
      <FounderItem founder={founders} key={founders._id}/>
    </Fragment>
  );
};

export default HomePage;
