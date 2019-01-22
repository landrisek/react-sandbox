import React from 'react'
import Parser from 'html-react-parser'

export function Autocomplete(props, state, autocomplete, onBlur, onChange, onDown) {
    var current = ''
    var length = 0
    var list = []
    for(var key in autocomplete.list) {
        if(length == autocomplete.position) {
            list.push(<li key={current = key}>{Parser(autocomplete.list[key])}</li>)
        } else {
            list.push(<li key={key} style={{display:'block'}}>{Parser(autocomplete.list[key])}</li>)
        }
        length++
    }
    return <div className={'form-group'}>
            <label htmlFor={props.label}>{props.label}</label>
            <input className={'form-control'}
                   current={current}
                   data-id={props.id}
                   length={length}
                   onBlur={onBlur}
                   onChange={onChange}
                   onKeyDown={onDown}
                   value={state}
                   type={'text'} />{list}
    </div>
}

export function Checkbox(props, state, onChange) {
    return <label>
        <input checked={'1' == state}
               data-id={props.id}
               className={props.className ? props.className : ''}
               onChange={onChange}
               type={'checkbox'}
               value={state} />{props.label}
    </label>
}

export function Info(message) {
    return <span className={'tipsy-help'} original-title={message}><img alt={message} src={'/assets/images/info.png'} /></span>
}

export function Link(props, state, onClick) {
    return <a className={props.className ? props.className : ''}
              data-id={props.id}
              href={state.href ? state.href : 'javascript:;'}
              onClick={onClick}
              title={state.title}>{state.value}</a>

}


export function Paginator(props, state, onClick) {
    var pages = []
    for (var page = 1; page <= state.last; page++) {
        if(page == state.current) {
            pages.push(<li key={page}><span className={'active'} title={props.page + ' '  + page}>{page}</span></li>)
        } else if((state.current - 3) == page && state.current > 3) {
            pages.push(<li className={'previous'} key={'previous'}><a data-id={page} onClick={onClick} title={props.previous}>&nbsp;</a></li>)
        } else if((state.current + 3) == page && state.current > 3) {
            pages.push(<li className={'next'} key={'next'}><a data-id={page} onClick={onClick} title={props.previous}>&nbsp;</a></li>)
        } else if((state.current - 2 > page && state.last > 5) || (page > state.current + 2 && state.last > 5)) {
        } else {
            pages.push(<li key={page}><a data-id={page} onClick={onClick} title={props.page + ' ' + page}>{page}</a></li>)
        }
    }
    return <div className={'paginator'}><ul>{pages}</ul></div>
}

export function Password(props, state, onChange) {
    return <div className={'form-group'}>
            <label htmlFor={props.label}>{props.label}</label>
            <input className={'form-control'}
                   data-id={props.id}
                   onChange={onChange}
                   value={state}
                   type={'password'} />
    </div>
}

export function RadioList(props, state, onChange) {
    var container = []
    for(var key in props.data) {
        var checked = false
        if(state == key) {
            checked = 'checked'
        }
        container.push(<label key={props.id + '-' + key}>
                <input checked={checked}
                       className={'form-control'}
                       name={props.id}
                       onChange={onChange}
                       value={key}
                       type={'radio'} />{props.data[key]}
                </label>)
    }
    return <div className={'form-group'} key={props.id}><label>{props.label}</label>{container}</div>
}

export function SelectBox(props, state, onChange) {
    var options = []
    options.push(<option key={props.id + '-prompt'}>{props.prompt}</option>)
    for(var key in props.data) {
        if(props.data[key] == state) {
            options.push(<option selected key={key} value={key}>{props.data[key]}</option>)
        } else {
            options.push(<option key={key} value={key}>{props.data[key]}</option>)
        }
    }
    return <label>{props.label}<select id={props.id} key={props.id} onChange={onChange}>{options}</select></label>
}

export function Text(props, state, onChange) {
    return <div className={'form-group'}>
            <label htmlFor={props.label}>{props.label}</label>
            <input className={'form-control'}
                   data-id={props.id}
                   onChange={onChange}
                   value={state}
                   type={'text'} />
    </div>
}

export function TextArea(props, state, onChange) {
    return <div className={'form-group'}>
            <label htmlFor={props.label}>{props.label}</label>
            <textarea className={'form-control'}
                   data-id={props.id}
                   onChange={onChange}
                   value={state}
                   type={'textarea'} >{state}</textarea>
    </div>
}

export function Warning(state) {
    if(undefined != state && state.length > 0) {
        return <div className={'warning'}>{state}</div>
    }
}