import React from "react";
import User from "../views/user";
import Login from "../views/login";
import Group from "../views/group";
import Department from "../views/department";
import Position from "../views/position";
import Logout from "../views/logout";
import Page404 from "../views/page404";

export const routesList = [
    {
        path: '/',
        layout: true,
        auth: true,
        element: <User/>
    },
    {
        path: '/login',
        layout: false,
        auth: false,
        element: <Login/>
    },
    {
        path: '/group',
        layout: true,
        auth: true,
        element: <Group/>,
    },
    {
        path: '/department',
        layout: true,
        auth: true,
        element: <Department/>,
    },
    {
        path: '/position',
        layout: true,
        auth: true,
        element: <Position/>
    },
    {
        path: '/logout',
        layout: false,
        auth: undefined,
        element: <Logout/>
    },
    {
        path: '/404',
        layout: false,
        auth: undefined,
        element: <Page404/>
    },
]


