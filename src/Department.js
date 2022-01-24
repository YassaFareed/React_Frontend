import React,{Component} from 'react';
import {variables} from  './Variables.js'

class Department extends Component{
    
    constructor(props){
        super(props);

        // this will be populated with department data from api
        this.state = {
            departments:[],
            modalTitle:"",
            DepartmentName:"",
            DepartmentId:0
        }
    }


  
     //this will get the data 
    refreshList(){
        fetch(variables.API_URL+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
         });
    }

    //calls refresh method once the component is mounted 
    componentDidMount(){
        this.refreshList();
    }

    
    changeDepartmentName =(e)=>{
        this.setState({DepartmentName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Department",
            DepartmentId:0,
            DepartmentName:""
        });
    }

    createClick(){
        fetch(variables.API_URL+'department',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                DepartmentName:this.state.DepartmentName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'department',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                DepartmentId:this.state.DepartmentId,
                DepartmentName:this.state.DepartmentName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    deleteClick(id){
        if(window.confirm('Are you sure you want to delete?')) //user's confirmation before deletion
        {
        fetch(variables.API_URL+'department/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    }

    editClick(dep){
        this.setState({
            modalTitle:"Edit Department",
            DepartmentId:dep.DepartmentId,
            DepartmentName:dep.DepartmentName
        });
    }
    

    render(){
        // To use it in html we need to declare departments here as well
        const {
            departments,
            modalTitle,
            DepartmentId,
            DepartmentName
        }=this.state;

        return(
            <div>

                {/* Button to open the modal window for add department*/}
                <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Department
                </button>

               <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>
                                DepartmentId
                            </th>
                            <th>
                                DepartmentName
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {departments.map(dep=>
                                <tr key={dep.DepartmentId}>
                                    <td>{dep.DepartmentId}</td>
                                    <td>{dep.DepartmentName}</td>
                                    <td>

                                        {/* Redirect to exampleModal when clicked */}
                                        <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>this.editClick(dep)}>
                                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </button>

                                        <button type="button"
                                        className='btn btn-light mr-1'
                                        onClick={()=>this.deleteClick(dep.DepartmentId)}>   
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )}

                    </tbody>
               </table>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className='modal-header'>
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>                

                     {/* When the value of text box changes we will execute a function and update the variable simultaneously  */}
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">DepartmentName</span>
                                <input type="text" className="form-control"
                                value={DepartmentName}
                                onChange={this.changeDepartmentName}/>
                           
                            </div>

                            {/* This button will be visible when user wants to add new department*/}
                            {DepartmentId===0?
                            <button type="button"
                            className="btn btn-primary float-start"
                            onClick={()=>this.createClick()}>
                                Create
                            </button>
                            :null}

                            {/* Update button will be visible when user want to edit a department or edit icon pressed*/}
                            {DepartmentId!==0?
                            <button type="button"
                            className="btn btn-primary float-start"
                            onClick={()=>this.updateClick()}>
                                Update
                            </button>
                            :null}
                        </div>

                </div>
            </div>
            </div>
            </div>
        )
    }
}

export default Department;