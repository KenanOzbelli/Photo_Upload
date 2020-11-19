import React, {Component} from 'react';
import FilesUploadComponent from './components/files-upload-component';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render(){
  return (
    <div className="App" style={{textAlign:"center"}}>
      <h2>React File Upload Test</h2>
      <FilesUploadComponent />
    </div>
  );
 }
} 


export default App;
