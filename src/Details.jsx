import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const getData = async (url) => {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await response.json();
    console.log(data);
    const result = {
      Country: data.address.country,
      Address: data.address.address,
      BirthDate: data.birthDate,
      Gender: data.gender,
      Image: data.image,
      Role: data.role,
      UserName: data.username,
      CardNum: data.bank.cardNumber,
      CardType: data.bank.cardType,
      CardExp: data.bank.cardExpire,
      Currency: data.bank.currency,
      Company: data.company.department,
      ComapanyName: data.company.name,
      Title: data.company.title,
    };
    setData(result); 
  };

 

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="details-container">
      <h1 className="detail-heading">Employee Details</h1>
      <div className="main-details">
        {data ? (
         <div className="main-description-details">
           <div className="description">
            <img src={data.Image} alt={data.UserName} />
            <div className="de-description">
              <h1>Username: {data.UserName}</h1>
              <p>Country: {data.Country}</p>
              <p>Address: {data.Address}</p>
              <p>Birth Date: {data.BirthDate}</p>
              <p>Gender: {data.Gender}</p>
              <p>Role: {data.Role}</p>
            </div>
          </div>

          <div className="company-details">
            <h1>Company Details:</h1>
            <p>Company: {data.ComapanyName}</p>
            <p>Department: {data.Company}</p>
            <p>Title: {data.Title}</p>
           </div>

          <div className="bank-details">
             <h1>Bank Details:</h1>
             <p>CardNum: {data.CardNum}</p>
             <p>CardType: {data.CardType}</p>
             <p>CardExp: {data.CardExp}</p>
             <p>Currency: {data.Currency}</p>
            </div>
          </div>

          
        ) : (
          <p className="loading">Loading...</p> 
        )}
      </div>
    </div>
  );
};

export default Details;
