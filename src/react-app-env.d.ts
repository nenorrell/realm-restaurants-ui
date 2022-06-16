/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        PUBLIC_URL: string
        REACT_APP_REALM_APP_ID: string
        REACT_APP_REALM_DASHBOARD_URL: string
        REACT_APP_REALM_DASHBOARD_ID: string
    }
}