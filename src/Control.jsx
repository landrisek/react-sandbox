import {Autocomplete, Checkbox, Info, Link, Paginator, Password, RadioList, SelectBox, Text, TextArea, Warning} from './Components.jsx'
import {Email, Equal, Phone, Required, Message, Minimum, Submit} from './Validators.jsx'
import React, {Component} from 'react'
import {Upload} from './Upload.jsx'

export class Control extends Component {
    constructor(props) {
        super(props)
        this.state = {_autocomplete:{list:{},position:0}, _invalid:{}}
    }
    Autocomplete(props, state) {
        return Autocomplete(props, state, this.state._autocomplete, this.blur.bind(this), this.autocomplete.bind(this), this.down.bind(this))
    }
    autocomplete(event) {
        fetch(this.props.data[event.target.getAttribute('data-id')].link,
            {body: event.target.value, headers: {Accept: 'application/json','Content-Type': 'application/json'}, method: 'POST'}).then(
            response => response.json()).then(data => { this.setState(data) })
    }
    blur() {
        this.setState({_autocomplete:{list:{},position:0}})
    }
    change(event) {
        this.setState(this.onUpdate({[event.target.getAttribute('data-id')]: event.target.value}))
    }
    check(event) {
        var state = this.state[event.target.getAttribute('data-id')]
        if(1 == event.target.value) {
            this.setState(this.onUpdate({[event.target.getAttribute('data-id')]:0}))
        } else {
            this.setState(this.onUpdate({[event.target.getAttribute('data-id')]:1}))
        }
    }
    Checkbox(state, props) {
        return Checkbox(state, props, this.check.bind(this))
    }
    componentDidMount() {
        fetch(this.props.data._state,
            {body: {}, headers: {Accept: 'application/json','Content-Type': 'application/json'}, method: 'POST'}).then(
            response => response.json()).then(data => { this.setState(data); this.onFetch(); })
    }
    down(event) {
        var state = this.state._autocomplete
        if(state.position == (parseInt(event.target.getAttribute('length')) - 1)) {
            state.position = 0
        } else if(13 == event.keyCode) {
            this.setState({[event.target.getAttribute('data-id')]:state.list[event.target.getAttribute('current')].replace(/<\/?[^>]+(>|$)/g, '')})
            state.list = {}; state.position = 0
        } else if(38 == event.keyCode && 0 == state[event.target.getAttribute('data-id')].position) {
            state.position = state.list.length
        } else if(38 == event.keyCode) {
            state.position--
        } else if(40 == event.keyCode) {
            state.position++
        }
        this.setState({_autocomplete:state})
    }
    drop(files, rejected, event) {
        var self = this
        for(var file in files) {
            if(files[file].type.match('image')) {
                var reader = new FileReader()
                reader.onload = function() {
                    fetch(self.props.data[event.target.getAttribute('data-id')].link, {body: reader.result, method: 'POST'}).then(response => response.json()).then(
                            state => {
                            state[event.target.getAttribute('data-id')] = self.state[event.target.getAttribute('data-id')]
                            state[event.target.getAttribute('data-id')].data.push(files[file].name)
                            self.setState(state)
                    })
                }
                reader.readAsDataURL(files[file])
            }
        }
    }
    Email(props, state) {
       return Email(this.constructor.name, props, state)
    }
    Equal(props, state, value) {
        return Equal(this.constructor.name, props, state, value)
    }
    Info(state) {
        return Info(state)
    }
    Link(props, state) {
        return Link(props, state, this.submit.bind(this))
    }
    Message(state) {
        return Message(state)
    }
    Minimum(props, state) {
        return Minimum(this.constructor.name, props, state)
    }
    Paginator(props, state) {
        return Paginator(props, state, this.submit.bind(this))
    }
    Password(props, state) {
        return Password(props, state, this.change.bind(this))
    }
    Phone(props, state) {
        return Phone(this.constructor.name, props, state)
    }
    radio(event) {
        this.setState({[event.target.name]:event.target.value})
    }
    RadioList(props, state) {
        return RadioList(props, state, this.radio.bind(this))
    }
    Required(props, state) {
        return Required(this.constructor.name, props, state)
    }
    onFetch() { }
    onUpdate(state) {
        return state
    }
    SelectBox(props, state) {
        return SelectBox(props, state, this.change.bind(this))
    }
    submit(event) {
        event.preventDefault()
        var id = event.target.getAttribute('data-id')
        this.setState({[id]: true})
        fetch(this.props.data._state,
            {body: JSON.stringify(this.state), headers: {Accept: 'application/json','Content-Type': 'application/json'}, method: 'POST'}).then(
               response => response.json()).then(state => { state[id] = false 
                                                           this.setState(state) })
    }
    Submit(props, state) {
        return Submit(this.constructor.name, props, state, this.submit.bind(this))
    }
    Text(props, state) {
        return Text(props, state, this.change.bind(this))
    }
    TextArea(props, state) {
        return TextArea(props, state, this.change.bind(this))
    }
    Upload(props, state) {
        var files = []
        for(var file in state.data) {
            files.push(<li key={props.id + file} className={'list-group-item'}>{state.data[file]}</li>)
        }
        return (<div key={props.id}>
                    <Upload id={props.id} label={props.label} multiple={false} onDrop={this.drop.bind(this)} />
                    <ul className='list-group'>{files}</ul>
                </div>)
    }
    validate(validators) {
        this.setState(validators)
    }
    Warning(state) {
        return Warning(state)
    }
}