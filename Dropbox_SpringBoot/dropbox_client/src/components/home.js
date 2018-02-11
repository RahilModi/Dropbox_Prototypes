import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as myactions from '../action_creators/home';
import { withRouter } from 'react-router-dom'
import Menu from './menu'
import Menu2 from './menu2'
import  '../css/uploadfile.css'
import '../css/table.css'
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import ReactTooltip from 'react-tooltip';
import {withAlert} from 'react-alert';

const URL = "http://localhost:8080";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
           firstname:"",
           lastname:"",
           email:"",
           status:"",
           msg:"",
           userid:"",
           files:[],
           foldertrack:[],
           currentfolderid:"",
           publicsharinglink:"",
           sharedcontentid:"",
           sharedcontent:{members:[]},
           shareUser:[],
           sharemembers:[]
        }
     }
     // ......Error Display .....
     alertOptions = {
        offset: 14,
        position: 'top center',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      }
     errorshowAlert = (msg) => {
        this.msg.show(msg, {
          time: 5000,
          type: 'success',
          icon: <img src={require('../images/error.png')} />
        })
      }
     successshowAlert = (msg) => {
        this.msg.show(msg, {
          time: 5000,
          type: 'success',
          icon: <img src={require('../images/success.png')} />
        })
      }
     // On Load 
    componentDidMount() {
        if(localStorage.id == 0){
            this.props.history.push('/signin');
        }
        if(typeof(Storage) !== "undefined") {
                if (localStorage.id) {
                    if(this.state.currentfolderid === "")
                    {
                       this.props.INIT(function(rootid){
                           window.history.pushState({data:rootid},"",'/home')
                       },{id:localStorage.id})
                    }
                    window.onpopstate = (event)=> {
                           console.log(event)
                           if(event.state==null || event.state == undefined)
                           {
                               this.props.INIT(function(rootid){
                                   window.history.pushState({data:rootid},"",'/home')
                               },{id:localStorage.id})
                           }
                           else if(event.state.hasOwnProperty('state')){
                               this.props.INIT(function(rootid){
                                   window.history.pushState({data:rootid},"",'/home')
                               },{id:localStorage.id})
                           }
                           else{
                               this.props.LOADFOLDER(this.state.userid,event.state.data)
                           }
                       } 
                } 
        }   
    }
  
    componentWillReceiveProps(nextProps) {
        if (nextProps.home) {
            if(nextProps.home.userid === undefined || nextProps.home.status === 'logout'){
                    this.props.history.push('/signin');
            }
            else{
                this.setState({
                    email:nextProps.home.email,
                    firstname:nextProps.home.firstname,
                    lastname:nextProps.home.lastname,
                    files:nextProps.home.files.reverse(),
                    userid:nextProps.home.userid,
                    currentfolderid:nextProps.home.currentfolderid,
                    status:nextProps.home.status,
                    msg:nextProps.home.msg
                
                })
            }

            if(nextProps.home.status ==="success"){
                // if(nextProps.home.msg!="")
                // this.successshowAlert(nextProps.home.msg)
                console.log(nextProps.home.msg);
            }
            else{
                // if(nextProps.home.msg!="")
                // this.errorshowAlert(nextProps.home.msg)
                console.log(nextProps.home.msg);
            }
        }
    }
    share(file){
        var link=`${URL}/${file.virtualname}`; 
        this.setState({publicsharinglink:link})
        this.setState({sharedcontentid:file})
        this.setState({sharedcontent:file})
        this.setState({sharemembers:file.members})
    }
     
    handleFileUpload = (event) => {
        const payload = new FormData();
        payload.append('file', event.target.files[0]);
        payload.append('userid',this.state.userid);
        payload.append('fileparent',this.state.currentfolderid);
        this.props.UploadFile(payload);
        event.target.value = null;
    };
    
    star(file)
    {
        console.log(file.star)
        if(file.star == 'YES'){
            return <img onClick={()=>this.props.dostar(file,this.state.userid,this.state.currentfolderid)}  src={require('../images/bluestar.png')} alt="" style={{width:"20px",height:"20px"}}/>           
        }
        else{
            return <img onClick={()=>this.props.dostar(file,this.state.userid,this.state.currentfolderid)} src={require('../images/whitestar.png')} alt="" style={{width:"20px",height:"20px"}}/>           
        }
    }

    getData(folder,type){
        window.history.pushState({data:folder.contentid},"",'/home/'+folder.originalname)
        this.props.LOADFOLDER(this.state.userid,folder.contentid)
    }

    display(file,i){
      
        if(file.type==="file")
        {
            this.check =1;
            console.log(file.star);
            var star = file.star;
            this.members=[];
            this.sharemsg = "Only you"
            if(file.members.length>0){
               this.members = file.members.map((member,i)=> member.firstname+" "+member.lastname+"<br>")
               this.members.push(this.state.firstname+" "+this.state.lastname+"<br>")
               var uniqueArray = this.members.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
               },this)
               this.members=uniqueArray
               if(this.members.length>1)
                    this.sharemsg = this.members.length +" members"
               else
                    this.sharemsg = "Only you"
            }
            else{
                this.sharemsg = "Only you"
                this.members.push(this.state.firstname+" "+this.state.lastname)
            }

        return (
            <tr key={file.contentid}>
            <td style={{width:"50%"}}>
            <img src={require('../images/file.png')} alt="" style={{width:"50px",height:"50px"}}/>    
            <span>{file.originalname}</span>
                {this.star(file)}
            </td>
            <td>
            <p>{(file.date).substring(0,32)}</p>    
            </td>
            <td>
            <p><a data-tip={this.members.toString().replace(/,/g, "")} data-html={true}>{this.sharemsg}</a></p>   
            <ReactTooltip place="bottom" type="dark" effect="float" html={true} /> 
           </td>
            <td>
            <button type="button" className="btn btn-default dropdown-toggle" id="menu1"
             data-toggle="dropdown"><b>&middot;&middot;&middot;</b></button>
            <ul className="dropdown-menu" role="menu">
                <li role="presentation">
                <a href={`${URL}/${file.virtualname}`} download>Download</a></li>
                <li><a data-toggle="modal" data-target="#fileModal" onClick={()=>this.share(file)}>Share</a></li>
                <li><a onClick={()=>this.props.deleteContent(file,this.state.userid,this.state.currentfolderid )}>Delete</a></li>
            </ul>
            </td>     
            </tr>
            )
        }
        else if(file.type==="folder"){
            this.check =1;
            this.members=[];
            this.sharemsg = "Only you"
            this.image = require('../images/folder.png')
            
            if(file.members.length>0){
                this.image = require('../images/folder.png')
                this.members = file.members.map((member,i)=> member.firstname+" "+member.lastname+"<br>")
                this.members.push(this.state.firstname+" "+this.state.lastname+"<br>")
                var uniqueArray = this.members.filter(function(item, pos, self) {
                 return self.indexOf(item) == pos;
                },this)
                this.members=uniqueArray
                if(this.members.length>1)
                    this.sharemsg = this.members.length +" members"
                else
                    this.sharemsg = "Only you"
            }
            else{
                this.sharemsg = "Only you"
                this.members.push(this.state.firstname+" "+this.state.lastname)
                this.image = require('../images/folder.png')
            }
        return ( 
            <tr key={file.contentid}>
                <td  style={{width:"50%"}}>
                <img src={this.image} alt="" style={{width:"50px",height:"50px"}}/>        
                <button className="btn btn-link"  onClick={()=>this.getData(file,"add")}>{file.originalname}</button> 
                    {this.star(file)}
                </td>
            <td>
                <p>{(file.date).substring(0,32)}</p>    
            </td>
            <td>  
                <p><a data-tip={this.members.toString().replace(/,/g, "")} data-html={true}>{this.sharemsg}</a></p>   
                <ReactTooltip place="bottom" type="dark" effect="float" html={true} /> 
            </td>
            <td>
                <button type="button" className="btn btn-default dropdown-toggle" id="menu1"
                    data-toggle="dropdown"><b>&middot;&middot;&middot;</b></button>
                <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                <li><a data-toggle="modal" data-target="#folderModal" onClick={()=>this.share(file)}>Share</a></li>
                <li><a onClick={()=>this.props.deleteContent(file,this.state.userid,this.state.currentfolderid )}>Delete</a></li>       
            </ul>
            </td> 
            </tr>
        )
        }
        else{
           console.log("elsepart"+check) 
           if(this.check===0){
            return (<tr key={i}>
                <td>
                <b>NO CONTENT</b>
                </td>
                </tr>  
                )
           }  
        }
    }
    inputChange (value) {
        console.log("value"+ value)
		this.setState({shareUser : value})
        console.log(this.state.shareUser)
    }
    getUsers (input) {
        console.log(this.state.shareUser+"----"+input);
        
		if (!input || input.length < 3) {
            console.log("i should not be called "+input)
			return Promise.resolve({ options: [] });
		}else{
		return fetch(`${URL}/user/suggestions`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"data1":input})})
            .then(response => response.json())
		    .then(json => {
                console.log(JSON.stringify(json.users))
			    return  {options:json.users};
            });
        }
    }
    
    displayUser(user,i){
        console.log(user);
        return (<p key={user.id} className="alert alert-info" >
            <strong>{user.firstname+" "+user.lastname}</strong>
        </p>)
    }

    render() {
        const AsyncComponent = Select.Async
        return (
            <div className="container-fluid">  
            <div className="row">
                <div className="col-6 col-md-2">
                <Menu/>
                </div>
                <div className="col-6 col-md-8">
                    <div style={{marginTop:"5%"}}>
                        <h4>Dropbox</h4>
                    </div>
                    <ReactTooltip place="bottom" type="dark" effect="float"/>
                    <div>
                        {this.state.foldertrack.map((item,i)=>
                        <div style={{display:"inline"}}>
                        <button className="btn btn-link" onClick={()=>this.getData(item,"remove")}>{item.originalname}
                        </button>></div>)}
                    </div>    
                    <div>
                    <table className="table">
                    <thead>
                     <tr>
                        <th  style={{width:"50%"}}>Name</th>
                        <th>Date</th>
                        <th>Member</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.files.map((this.display),this)
                        }
                    </tbody>  
                    </table>
                </div>
                </div>
                
                <div className="col-6 col-md-2">
                    <Menu2/> 
                    <div style={{marginTop:"40%"}}>
                    <div className="upload-filebtn-wrapper">
                    <button className="btn btn-primary" style={{width:"150px"}} >Upload a file</button>
                    <input type="file" name="myfile" onChange={this.handleFileUpload}/>
                    </div>
                    <br/><br/>
                    <input type="text" className="form-control" ref = "foldername" 
                    id="newfoldername" placeholder="Folder/Group Name" style={{width:"150px"}}/>
                    <br/>
                    <button className="btn btn-primary" style={{width:"150px"}}
                    onClick={()=>this.props.UploadFolder(this.state.currentfolderid,
                    this.refs.foldername.value,this.state.userid)}>Create</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="fileModal" role="dialog">
                <div className="modal-dialog"> 
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Share</h4>
                    </div>
                    <div className="modal-body">
                       
                    <p>Public Link:<input className="form-control" value={this.state.publicsharinglink}/></p>
                    <hr/>
                    <div className="section">
                        <Select.Async multi={true}
                        value = {this.state.shareUser} 
                        valueKey="id"
                        labelKey="all" 
                        onChange = {this.inputChange.bind(this)}
                        loadOptions={this.getUsers.bind(this)} 
                        backspaceRemoves={true}
                        placeholder="Email or Name " />
                        <div style={{marginTop:"15px"}}>
                                {
                                   this.state.shareUser.length>0 && this.state.shareUser.map((this.displayUser),this)
                                }
                        </div>
                    </div>
                    </div>
                    <hr/>
                    <div style={{padding:'2%'}}>
                    <h4> Members </h4>
                    {this.state.sharemembers.map(function(member,i){
                        return(<div>
                            <p className="alert alert-warning" >{member.firstname + " "+ member.lastname}
                            <button className="btn btn-link" data-dismiss="modal" 
                            onClick={()=>this.props.deleteMember(this.state.sharedcontentid.contentid,member.id,this.state.userid,this.state.currentfolderid)}
                            ><i className="fa fa-trash fa-2x"></i></button>
                            </p>
                        </div> )   
                    },this)}
                    </div>

                    <div className="modal-footer">
                    <button className="btn btn-primary" data-dismiss="modal"
                    onClick={()=>this.props.share(this.state.shareUser,
                        this.state.userid,
                        this.state.sharedcontentid,
                        this.state.currentfolderid)}>Share</button>  
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
      
                </div>
            </div>
            <div className="modal fade" id="folderModal" role="dialog">
                <div className="modal-dialog"> 
                <div className="modal-content">
                    <div className="modal-header">
                    
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Share</h4>
                    </div>
                    <div className="modal-body">
                    <div className="section">
                        <Select multi={true}
                        value={this.state.shareUser} 
                        onInputChange={this.inputChange.bind(this)} 
                        valueKey="id" labelKey="all"
                        loadOptions={this.getUsers.bind(this)} 
                        backspaceRemoves={true}
                        placeholder="Email or Name " />
                        <div style={{marginTop:"15px"}}>
                                {
                                    this.state.shareUser.length>0 && this.state.shareUser.map((this.displayUser),this)
                                }
                        </div>
                    </div>
                    
                     </div>
                  
                     <hr/>
                    <div style={{padding:'2%'}}>
                    <h4> Members </h4>
                    {this.state.sharemembers.map(function(member,i){
                        return(<div>
                            <p className="alert alert-warning" >{member.firstname + " "+ member.lastname}
                            <button className="btn btn-link" onClick={()=>this.props.deleteMember(this.state.sharedcontentid.contentid,member.id,this.state.userid,this.state.currentfolderid)}
                            data-dismiss="modal" ><i className="fa fa-trash fa-2x"></i></button>
                            </p>
                        </div> )   
                    },this)}
                    </div>
                  
                   
                    <div className="modal-footer">
                    <button className="btn btn-primary" data-dismiss="modal"
                    onClick={()=>this.props.share(this.state.shareUser,
                        this.state.userid,
                        this.state.sharedcontentid,
                        this.state.currentfolderid)}>Share</button>    
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
      
                </div>
            </div>
                  
          </div>
        );
    }
}


function mapStateToProps(state){
    return{
        home : state.home
    }
}
function matchDispatchToProps(dispatch){     
    return bindActionCreators(myactions,dispatch)
}
 
 
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(Home));