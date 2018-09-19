import Vue from 'vue'
import Router from 'vue-router'

import Sms from '@/components/Sms'
import project from '@/components/Project'

import devManage from '@/components/Manage/devManage'
import tenantManage from '@/components/Manage/tenantManage'
import systemConfig from '@/components/Manage/systemConfig'
import Manage from '@/components/Manage/Manage'
import Tenant from '@/components/Manage/Tenant'
import Dev from '@/components/Manage/Dev'
import System from '@/components/Manage/system'

import Home from '@/views/Home'



import Login from '@/views/Login'
import NotFound from '@/views/404'

/*物业系统界面 */
import House from '@/views/house/House'
import Card from '@/views/house/Card'
import cardAllot from '@/views/house/cardAllot'
import cardPre from '@/views/house/cardPre'
import tenantInfo from '@/views/house/tenantInfo'
import tenantInfoManage from '@/views/house/tenantInfoManage'
import devHouse from '@/views/house/devHouse'
import devHouseManage from '@/views/house/devHouseManage'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'manage',
          name: 'manage',
          component: Manage ,
          children: [
            {        
              path: 'tenant',
              component: Tenant ,          
              children: [
                {
                  path: 'tenantManage',
                  name: 'tenantManage',
                  component: tenantManage
                }            
              ]
            },
            {        
              path: 'system',
              component: System ,                
              children: [
                {
                  path: '/systemConfig',
                  name: 'systemConfig',
                  component: systemConfig
                }            
              ]
            },
            {        
              path: 'dev',
              component: Dev ,
              children: [
                {
                  path: 'devManage',
                  name: 'devManage',
                  component: devManage
                }            
              ]
            }
          ]
        },
        {
          path: 'house',
          name: 'house',
          component: House,                
          children: [
            {        
              path: 'card',
              component: Card ,          
              children: [
                {
                  path: 'cardPre',
                  name: 'cardPre',
                  component: cardPre
                },
                {
                  path: 'cardAllot',
                  name: 'cardAllot',
                  component: cardAllot
                }            
              ]
            },
            {        
              path: 'tenantInfo',
              component: tenantInfo ,                
              children: [
                {
                  path: 'tenantInfoManage',
                  name: 'tenantInfoManage',
                  component: tenantInfoManage
                }            
              ]
            },
            {        
              path: 'dev',
              component: devHouse ,
              children: [
                {
                  path: 'devManage',
                  name: 'devManage',
                  component: devHouseManage
                }            
              ]
            }
          ]
        },
        {
          path: 'project',
          name: 'project',
          component: project
        },
        {
          path: 'sms',
          name: 'sms',
          component: Sms
        }
      ]
    },
   
    
    ,{
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }    
  ]
})
