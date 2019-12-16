import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Button } from 'antd'
class App extends React.Component {
    render() {
        return (
            <div className='test'>
                <Button>hello</Button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))