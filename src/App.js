import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
    street: "",
    cell: "",
    password: "",
    picture: { large: defaultImage },
  });

  const [userInfo, setUserInfo] = useState("");
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data.results[0])
    setUserData(data.results[0]);
    //console.log(userData)
  };

  useEffect(() => {
    getUser();
  }, []);

  const addUser = (id) => {

    const isUserExist = users.some(user =>user.uuid === userData.login.uuid )
    if(isUserExist){
      alert("This user is already added")
    } else {
      
      const newUser = {
        uuid : userData.login.uuid,
        Firstname: userData.name.first,
        Email: userData.email,
        Phone: userData.cell,
        Age: userData.dob.age,
      };
      setUsers([...users, newUser]);
    }
    //console.log(newUser);
  };
  //console.log(users);

  const handleMouseOver = (dataLabel) => {
    let userInfo;
    let title;
    switch (dataLabel) {
      case "name":
        userInfo = `${userData.name.first} ${userData.name.last}`;
        title = "name";
        break;
      case "email":
        userInfo = userData.email;
        title = "email";
        break;
      case "age":
        userInfo = userData.dob.age;
        title = "age";
        break;
      case "street":
        userInfo = userData.location.street.name;
        title = "street";
        break;
      case "phone":
        userInfo = userData.cell;
        title = "phone number";
        break;
      case "password":
        userInfo = userData.login.password;
        title = "password";
        break;
      default:
        userInfo = "";
        title = "";
    }
    setUserInfo(userInfo);
    setTitle(title);
  };

  //console.log(userData.gender)

  return (
    <main>
      <div className="block bcg-orange">
        <h1 className="header">RANDOM USER</h1>
        {/* <img src={cwSvg} alt="cw" id="cw" /> */}
      </div>
      <div className="block">
        <div className="container">
          <img
            src={userData?.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{userInfo}</p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img
                src={userData.gender === "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
                onMouseOver={() => handleMouseOver("name")}
              />
            </button>
            <button className="icon" data-label="email">
              <img
                src={mailSvg}
                alt="mail"
                id="iconImg"
                onMouseOver={() => handleMouseOver("email")}
              />
            </button>
            <button className="icon" data-label="age">
              <img
                src={userData.gender === "female" ? womanAgeSvg : manAgeSvg}
                alt="age"
                id="iconImg"
                onMouseOver={() => handleMouseOver("age")}
              />
            </button>
            <button className="icon" data-label="street">
              <img
                src={mapSvg}
                alt="map"
                id="iconImg"
                onMouseOver={() => handleMouseOver("street")}
              />
            </button>
            <button className="icon" data-label="phone">
              <img
                src={phoneSvg}
                alt="phone"
                id="iconImg"
                onMouseOver={() => handleMouseOver("phone")}
              />
            </button>
            <button className="icon" data-label="password">
              <img
                src={padlockSvg}
                alt="lock"
                id="iconImg"
                onMouseOver={() => handleMouseOver("password")}
              />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="body-tr">
                  <td className="td">{user.Firstname}</td>
                  <td className="td">{user.Email}</td>
                  <td className="td">{user.Phone}</td>
                  <td className="td">{user.Age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <Footer /> */}
      </div>
    </main>
  );
}

export default App;
