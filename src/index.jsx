import Post from './Post'
import './styles/styles.css'
import json from './assets/json.json'
import WebpackLogo from '@assets/webpack-logo.png'
import xml from '@assets/data.xml'
import csv from '@assets/data.csv'
import * as $ from 'jquery'
//import './index.html'
import './styles/less.less'
import './styles/scss.scss'
import  './babel'
import React from 'react'
import {render} from 'react-dom'

const post = new Post('Webpack Post Title', WebpackLogo)

$('pre').html(post.toString())

const App = () => (
    
    <div class="container">
        <h1>Webpack Course</h1>
        <hr/>
        <div class="logo"/>
        <hr/>
        <pre/>
        <hr/>
        <div class="box">
            <h2>Less</h2>
        </div>
        <hr/>
        <div class="card">
            <h2>Scss</h2>
        </div>
    </div>
)
render(
    <App/>, document.getElementById('app')
)

console.log('Post to String', post.toString())

console.log('JSON', json)
console.log('XML', xml)
console.log('CSV', csv)
