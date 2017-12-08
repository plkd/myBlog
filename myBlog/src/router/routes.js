import Reg from '../components/backEnd/Reg';
import Login from '../components/backEnd/Login';
import Admin from '../components/backEnd/Admin';
import ArticleCreate from '../components/backEnd/ArticleCreate'
import ArticleList from '../components/backEnd/ArticleList'
import ArticleEdit from '../components/backEnd/ArticleEdit'
import ClassList from '../components/backEnd/ClassList'

export default [
  {
    path:'/reg',
    component:Reg,
    meta:{auth:false},
    hidden:true
  },
  {
    path:'/admin',
    component:Admin,
    name:'管理面板',
    i:'el-icon-message',
    children:[
      {

      }
    ]
  }

]
