import React, { Component } from 'react'

import { ErrorIndicator } from './helpers/ErrorIndicator'

interface Props {
    
}
interface State {
    hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props:any){
        super(props)
        this.state={
            hasError:false
        }
    }

    componentDidCatch(){
        this.setState({
            hasError:true
        })
    }
    static getDerivedStateFromError(error:any) {
        return {hasError: true}
    }

    render() {
        if(this.state.hasError){
            return <ErrorIndicator/>
        }
        return this.props.children
    }
}

