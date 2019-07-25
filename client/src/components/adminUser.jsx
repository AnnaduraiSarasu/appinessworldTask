
import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';


class adminUser extends Component {
  constructor(){
    super();
     this.error ={};
     this.comparepwd=null;
     this.fieldvalue ={};
     this.data=null;
     this.getData();

  }
  state ={
      error:{
        username:null,
        email:null,
        password:null
      }
    }


     getData =() =>{
          const headers = {'Content-Type': 'application/json'}
               axios.post(`http://localhost:5005/getUser`,{headers: headers})
                 .then(res => {
                   if(res.data.success){
                      this.data = res.data.data;
                   }
                   this.setState({
                  data:this.data
                });
                 })
        }   
    
 
    getformdata = (e)=> {
      let fieldName = e.target.name;
     
        if(fieldName === "email"){
          const validatorFinal =validator.isEmail(e.target.value);

            if(validatorFinal){
              this.fieldvalue['email'] =e.target.value;
              this.error['email'] ='';
            }else{
              this.error['email'] ='Not Valid Email';
            }
        }

        if(fieldName === "username"){
          const validatorFinal =validator.isAlphanumeric(e.target.value);
            if(validatorFinal){
              this.fieldvalue['username'] =e.target.value
              this.error['username'] ='';
            }else{
              this.error['username'] ='Not Valid Username';
            }
    
        }

        if(fieldName === "password" ){
          this.comparepwd =e.target.value;
        }
        if (fieldName === "password_confirm"){
          const validatorFinal = (e.target.value === this.comparepwd) ? true : false;
            if(validatorFinal){
              this.fieldvalue['password'] =e.target.value
              this.error['password'] ='';
            }else{
              this.error['password'] ='Password Mismatch';
            }
        }
        this.setState({
          error:this.error
        });
     
    } 
    getFinalestate = (event)=>{
          let { name, value } = event.target;

         if(this.fieldvalue.email &&  this.fieldvalue.username &&  this.fieldvalue.password){
           event.preventDefault();
          
           const headers = {'Content-Type': 'application/json'}
           axios.post(`http://localhost:5005/createUser`, { email: this.fieldvalue.email,
            username: this.fieldvalue.username,
            password: this.fieldvalue.password },{headers: headers})
             .then(res => {
               if(res.data.success){
                  if(res.data.error){
                    if(res.data.error[0].param === "password"){
                       this.error['password'] = "password length should be 5 or more";
                    }
                    this.setState({
                      error:this.error
                    });

                  }else{
                      this.data = res.data.data;
                                this.setState({
                        data:this.data
                      });

                  }
                
               }
               
             })

         }else{
            let erromsg = "Please Fill Field"
            if(!this.fieldvalue.email){
              this.error['email'] =erromsg;
            } 
            if(!this.fieldvalue.username){
              this.error['username'] =erromsg;
            }
            if(!this.fieldvalue.password){ 
              this.error['password'] =erromsg;
            }
            this.setState({
              error:this.error
            });
         }
    }


    rendermap(){

      if(this.data) return this.data.map(item =><tr key={item._id}><td>{item.username}</td><td>{item.email}</td><td>{item.role}</td></tr>) ; 
      return <tr><td>No Records</td></tr>;
                               
      }

    render() { 
        return (

            <React.Fragment>
              <div className="d-flex justify-content-center align-items-center container ">  
                <div className="row ">
                   <form className="form-horizontal" action='#' method="POST">
                      <fieldset>
                        <div id="legend">
                        <legend>Create User</legend>
                        </div>
                        <div className="control-group">
                        <label className="control-label"  htmlFor="username">Username</label>
                        <div className="controls">
                            <input type="text" id="username" name="username"  onChange={this.getformdata} className="input-xlarge"/>
                            <p className="help-block">{this.state.error.username}</p>
                        </div>
                        </div>
         
                        <div className="control-group">
                          <label className="control-label" htmlFor="email">E-mail</label>
                          <div className="controls">
                            <input type="text" id="email" name="email"  onChange={this.getformdata} className="input-xlarge"/>
                            <p className="help-block">{this.state.error.email}</p>
                          </div>
                        </div>
              
                        <div className="control-group">
                          <label className="control-label" htmlFor="password">Password</label>
                          <div className="controls">
                            <input type="password" id="password" name="password" onChange={this.getformdata} className="input-xlarge"/>
                            <p className="help-block">{this.state.error.password}</p>
                          </div>
                        </div>
              
                        <div className="control-group">
                          <label className="control-label"  htmlFor="password_confirm">Password (Confirm)</label>
                          <div className="controls">
                            <input type="password" id="password_confirm" name="password_confirm" onChange={this.getformdata} placeholder="" className="input-xlarge"/>
                            <p className="help-block"> {this.state.error.password}</p>
                          </div>
                        </div>
                        <div className="control-group">
                        <div className="controls">
                          <input type="button" className="btn btn-success"  disabled={this.state.error.username || this.state.error.email || this.state.error.password} onClick={this.getFinalestate} value="Register"/>
                        </div>
                        </div>
                      </fieldset>
                    </form>
                  </div>
              </div>

              <div className="container">
                <h2>UserDetails</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.rendermap()}
                  </tbody>
                </table>
              </div>


            </React.Fragment>
            )
    }
}

export default adminUser;
