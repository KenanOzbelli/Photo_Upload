import React, { Component } from 'react';
import axios from 'axios';

export default class FilesUploadComponent extends Component {
    constructor(props){
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            profileImg:'',
            notification:''
        }
    }
    onFileChange(e){
        this.setState({ profileImg: e.target.files[0]})
    }
    onSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('profileImg', this.state.profileImg)
        axios.post('http://localhost:4000/api/user-profile', formData, {
        }).then(res=> {
            this.setState({notification: res.data.message});
            document.querySelector('.success').style.display = ''
           setInterval(()=>{ 
                document.querySelector('.success').style.display = 'none'
            }, 2000)
        }).catch(err => {
            if(err){
                console.log(err);
            }
        })
    }

    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <form style={{margin:"0 auto"}} onSubmit={this.onSubmit}>
                        <h3>React File Upload</h3>
                        <div className='form-group'>
                            <input type='file' onChange={this.onFileChange}/>
                        </div>
                        <div className='form-group '>
                            <button className='btn btn-primary' type='submit'>Upload</button>
                        </div>
                    </form>
                </div>
                <h3 style={{background:'rgb(24,245,32,.8)',boxShadow:'5px 5px 10px lightgrey',margin:'2rem 3rem',padding:'1.5rem',color:'white',display:'none'}} className='success'>{this.state.notification}</h3>
            </div>
        )
    }
}