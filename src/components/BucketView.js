import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useHistory} from "react-router-dom";

const BucketView = () => {
  let history = useHistory();
  const [bucket, setBucket] = useState({
    quantity: "",
  });
  const {id} = useParams();

  const { quantity} = bucket;
  const onInputChange = e => {
    setBucket({ ...bucket, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBucket();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/vegbucket/${id}`, bucket);
    history.push(`/vegbucket/${id}`, bucket);
  };

  const loadBucket = async () => {
    const res = await axios.get(`http://localhost:3003/vegbucket/${id}`);
    setBucket(res.data);
  };
  return (
    <div className="container">     
    <div className="modal-dialog-dark">
        <div class="modal-content">            
      <div class="modal-header">                  
      <Link type="button" class="btn btn-close" to="/vegbucket"></Link>
      </div>                         
        <div class="modal-body">
        { bucket.available > 0 ? <h2 style={{color:"green"}}>in-stock</h2> : <h2 style={{color:"red"}}>out-of-stock</h2>}     
        <img src={bucket.image_url} width="200" alt={bucket.name} /> 
        <h3>Name: {bucket.name} </h3>
        <h3>Price: {bucket.price}</h3>        
        <h3>Available: {bucket.available}</h3>
        <form onSubmit={e => onSubmit(e)}>
        <h3>Quantity:
          <select name="quantity" value={quantity}  onChange={e => onInputChange(e)}>
              <option>Select...qty</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option> 
              <option>5</option> </select>                        
          
          <button>Add in Cart</button></h3>
        </form>
        <h3>Vendor address: {bucket.vendor}</h3>
      <br/>
      <div class="modal-footer">
            <Link className="btn btn-primary" to="/vegbucket">
              back to Home
            </Link>
            { bucket.available == bucket.quantity ? <Link className="btn btn-primary" to="/sucessfull"> Purchase</Link> : <Link className="btn btn-primary" to="/failed"> Purchase</Link> }   
      </div>
      
      </div>
                
                </div>
            </div>
        </div>
  );
};

export default BucketView;
