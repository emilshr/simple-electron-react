import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import { Button, Container, Dropdown, Form, Icon, TextArea } from 'semantic-ui-react';
import ContentEditable from "react-contenteditable";
import './Home.css';

import { startAudio, stopAudio } from '../audio/miceAudioStream';
import getCredentials from '../services/getTranscribeCredentials';
import runComprehend from '../comprehend/comprehendUtil';
import { TranscriptHTML, TranscriptLine } from '../comprehend/TranscriptLine';
import { readText, writeText } from '../firebase/fb-service';

function App() {

  return (
    <HomeScreen/>
  );
}

export default App;

class HomeScreen extends Component {

  constructor(props){  
    super(props);  
    this.state = { listening: false, transcriptPiece: "", clientCredentials: {}, transcriptionHtml: "", documentId: new Date(), text: '' };
    this.textLog = React.createRef()
  }
  
  componentDidMount() {
    this.startReading();
  }
  


  startReading = () => {
    
      readText((content) => {
        console.log('read ... ', content)
        this.setState({ text: content })
        console.log(this.textLog)
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight;
      })
    
  }

  startRecording = () => {
    const result = getCredentials()
    
      startAudio(this.toggleStartStop, this.getTranscript, result);
      this.setState({clientCredentials: result})
  }

  getTranscript = (transcript, isFinal) => {
    if (isFinal) {
      runComprehend(transcript, this.state.clientCredentials)
      .then(entities => {
        let htmltxt = renderToString(<TranscriptLine chunk={transcript} results={entities}/>)
        this.setState({ transcriptionHtml: this.state.transcriptionHtml + htmltxt, transcriptPiece: ''})
      })
    } else {
      this.setState({transcriptPiece: transcript + "\n"})
      writeText(transcript)
    }
    this.scrollToBottom();
  }

  endRecording = () => {
    stopAudio();
  }

  toggleStartStop = () => {
    this.setState({listening: !this.state.listening})
  }

  scrollToBottom = () => {
    if(this.textarearef) {
     this.textarearef.scrollIntoView({ behavior: "smooth" })
    }
  }

  render() {
    const {listening, textchunks} = this.state;

    console.log({ textchunks })

    return (
      <div>
        <Container text style={{ marginTop: '2em' }}>
          <Form>
            <div className='homepage'>
              <textarea ref={this.textLog} value={this.state.text} disabled />
              {listening ? '' : <Icon name="microphone" className="mice" link onClick={this.startRecording}/> }
              {listening ? <Icon name="mute" className="mute" link onClick={this.endRecording}/> :''}
            </div>
            </Form>
        </Container>
      </div>
    );
  }
}