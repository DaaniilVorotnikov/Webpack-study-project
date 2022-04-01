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

const post = new Post('Webpack Post Title', WebpackLogo)

$('pre').html(post.toString())

console.log('Post to String', post.toString())

console.log('JSON', json)
console.log('XML', xml)
console.log('CSV', csv)
