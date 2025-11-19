import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ReportRouteLayout() {

    return <>
        <style>
            {`
        html, body, #root {
          margin: 0;
          height: fit-content;
          padding: 0;
        }
        `}
        </style>
        <Outlet />
    </>
}

